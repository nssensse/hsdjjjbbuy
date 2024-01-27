import Note from "../../model/Note";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";

//////widget
export default async function show() {
  dbConnect();
  const notes = await Note.find();

  const users = [
    // Replace this array with your actual users array
    { email: "user1@example.com", gender: "Male", name: "User One" },
    { email: "user2@example.com", gender: "Female", name: "User Two" },
    // ... other user objects
  ];

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
                <ul className="aff">BONUSBUY</ul>
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
  
              {/* Add your user table here */}
              {notes.map((user, index) => 
              (
                <tr key={index} className="tech-slideshow" width="">
                  <td>{index + 1}.</td>
                  <td>{user.title}</td>
                  <td>{user.note}₽</td>
                  <td>{123}₽</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container-bar">
            <div className="progress2 progress-moved">
              <div className="progress-bar2"></div>
            </div>
          </div>
        </div>
      </>
    </main>
  );
}