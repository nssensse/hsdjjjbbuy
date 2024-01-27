import Note from "../../../model/Note";

import { redirect } from 'next/navigation'
import dbConnect from "../dbConnect";
import Link from "next/link";
////editing
export default async function Home() {
  async function newNote(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let note = data.get("note")?.valueOf();
    let winning = data.get("winning")?.valueOf();
    try {
      dbConnect()
      let newNote = new Note({ title, note,winning });
      await newNote.save();
      console.log(newNote);
    } catch (error) {
      console.log(error)
    }
    redirect("/show");
  }



  const notes = await Note.find();

  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }
  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Create Note</h1>
      <form action={newNote}>
        <div>
          <label className="text-lg ">Title</label>
          <br />
          <input
            type="text"
            name="title"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
          />
        </div>
        <div>
          <label className="text-lg ">Note</label>
          <br />
          <input
            type="text"
            name="note"

            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
          ></input>
        </div>
        <div>
          <label className="text-lg ">Winning</label>
          <br />
          <input
            type="text"
            name="winning"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-yellow-400 font-bold hover:bg-orange-500 hover:text-white"
        >
          Submit
        </button>
      </form><h1 className="text-xl font-bold">Notes</h1>


        {notes.map((user, index) => 
              (
                <tr key={index} width="">
                  <td>{index + 1}.</td>
                  <td>{user.title}</td>
                  <td>{user.note}₽</td>
                  <td>{user.winning}₽</td>
                  <div className="flex">
                    <form action={deleteNote}>
                        <input type="hidden" value={JSON.stringify(user._id)} name="id"/>
                      <button
                        type="submit"
                        className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                    {/* <Delete id={element._id}/> */}
                    <Link href={"/Edit/" + user._id}>
                      <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </div>
                </tr>
              ))}

    </main>
  );
}

