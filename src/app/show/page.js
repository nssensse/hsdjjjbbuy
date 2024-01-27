import Note from "../../../model/Note";

import { redirect } from 'next/navigation'
import dbConnect from "../dbConnect";
////editing
export default async function Home() {
  async function newNote(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let note = data.get("note")?.valueOf();

    try {
      dbConnect()
      let newNote = new Note({ title, note });
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
          <label>Note</label>
          <br />
          <textarea
            type="text"
            name="note"
            rows="3"
            className="w-[100%] md:w-[50%] bg-slate-200 p-3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-3 bg-yellow-400 font-bold hover:bg-orange-500 hover:text-white"
        >
          Submit
        </button>
      </form><h1 className="text-xl font-bold">Notes</h1>
      <div>
        <ul className="flex font-bold">
          <li className="flex-1">Title</li>
          <li className="flex-1">Note</li>
          <li className="flex-1">Options</li>
        </ul>
        <hr />
        {notes.map((element) => {
          return (
            <>
              <ul key={element._id} className="flex">
                <li className="flex-1">{element.title}</li>
                <li className="flex-1">{element.note}</li>
                <li className="flex-1">
                  <div className="flex">
                    <form action={deleteNote}>
                        <input type="hidden" value={JSON.stringify(element._id)} name="id"/>
                      <button
                        type="submit"
                        className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                    {/* <Delete id={element._id}/> */}
 
                  </div>
                </li>
              </ul>
              <hr />
            </>
          );
        })}
      </div>
    </main>
  );
}

