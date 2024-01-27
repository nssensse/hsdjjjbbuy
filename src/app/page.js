import Note from "../../model/Note";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import Delete from "./components/Delete";
import Link from "next/link";
//////widget
export default async function show() {
  dbConnect();
  const notes = await Note.find();

  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }

  return (
    <main className="main">

        
          <>
            <div className="contcont">
              <div className="main-header">
                <div className="header-info">
                  <div className="bbtittle">
                    <div className="pic-logo"></div>
                    <ul>BONUSBUY</ul>
                  </div>
                  <div className="nowslot">⭐</div>
                  <div className="topslot">🏆</div>
                  <table id="table_fixed">
                    <thead>
                      <tr>
                        <th>Balance</th>
                        <th>💰</th>
                      </tr>
                      <tr>
                        <th>Bonuses</th>

                        <th> 🎁</th>
                      </tr>
                      <tr>
                        <th>Profit</th>
                        <th> 📈</th>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <th>1.2X 📋</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>

              <table className="table tbdsfsd">
                <thead className="thead-dark">
                  <tr>
                    <th width="10px"></th>
                    <th width="350px">Slot name</th>
                    <th width="30px">Bonus cost</th>
                    <th width="40px">Bonus win</th>
                  </tr>
                </thead>

                <tbody>
                {notes.map((element) =>
      {
                  <ul key={element._id} className="flex">
                    <li className="flex-1">{element.title}</li>
                    <li className="flex-1">{element.note}</li>
                    <li className="flex-1">
                      <div className="flex">
                        <form action={deleteNote}>
                          <input
                            type="hidden"
                            value={JSON.stringify(element._id)}
                            name="id"
                          />
                          <button
                            type="submit"
                            className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer"
                          >
                            Delete
                          </button>
                        </form>
                        {/* <Delete id={element._id}/> */}
                        <Link href={"/Edit/" + element._id}>
                          <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </li>
                  </ul>
                  
                })}               
                </tbody>
              </table>
              <div className="container-bar">
                <div className="progress2 progress-moved">
                  <div className="progress-bar2"></div>
                </div>
              </div>
            </div>
          </>
        );
      
    </main>
  );
}
