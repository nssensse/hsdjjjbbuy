import Note from "../../model/Note";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";

//////widget
export default async function show() {
  dbConnect();
  const notes = await Note.find();
  let suum=12;
  let sum = (a) => a.reduce((x, y) => x + y);
  let totalAmount = sum(notes.map((x) => Number(x.winning)));
  
  let profit = (a) => a.reduce((x, y) => x + y);
  let  totalprofit= profit(notes.map((x) => Number(x.note)));





  function countObjectsWithNegativeOrEmptyWinning(data) {
    let count = 0;
  
    for (const obj of data) {
      // Проверяем, является ли поле winning пустым или меньшим нуля
      if (obj.winning || parseInt(obj.winning) > 0) {
        count++;
      }
    }
  
    return count;
  }
  
  const result = countObjectsWithNegativeOrEmptyWinning(notes);
  ///////////
  function findNearestObjectWithEmptyValue(users, key) {
    let nearestObject = null;
    let distance = Infinity;
  
    for (let i = 0; i < users.length; i++) {
      const object = users[i];
      if (object.hasOwnProperty(key) && object[key] == 0) {
        const currentDistance = Math.abs(i - users.indexOf(object));
        if (currentDistance < distance) {
          distance = currentDistance;
          nearestObject = object;
        }
      }
    }
  
    return nearestObject;
  }
  const nearestObject = findNearestObjectWithEmptyValue(notes, "winning");
  ///////////
 
 
 const min = 0;
 const max = 570;
 
 // Clamp number between two values with the following line:
 const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
 
 clamp(-50, min, max); // Will return: 0
 clamp(50, min, max);  // Will return: 50
 let progrbaar;
 progrbaar=clamp(totalAmount/totalprofit*550, min, 570); // Will return: 100
  ///////////
  const firstObjectWithEmptyWinning = notes.find(obj => !obj.winning);

// Извлекаем title первого объекта с пустым winning
const titleOfFirstObjectWithEmptyWinning = firstObjectWithEmptyWinning ? firstObjectWithEmptyWinning.title : null;
const titleOfFirstObjectWithEmptyWinning21 = firstObjectWithEmptyWinning ? firstObjectWithEmptyWinning.note : null;
  ///////////
  const objectWithMaxWinning = notes.reduce((max, obj) => (parseInt(obj.winning) > parseInt(max.winning) ? obj : max), notes[0]);

// Извлекаем title объекта с наибольшим winning
const titleOfObjectWithMaxWinning = objectWithMaxWinning.title;

const titleOfObjectWithMaxWinning1 = objectWithMaxWinning.note;
  ///////////
  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }
  const maxWinning = Math.max(...notes.map(user => parseInt(user.winning) || 0));

  return (
    
    <main className="main">
      <>
      <meta http-equiv="refresh" content="11"></meta>
        <div className="contcont">
          <div className="main-header">
            <div className="header-info">
              <div className="bbtittle">
                <div className="pic-logo"></div>
                <ul className="aff">BONUSBUY</ul>
              </div>
              <div className="nowslot">⭐ {titleOfFirstObjectWithEmptyWinning21}₽|{titleOfFirstObjectWithEmptyWinning}</div>
              <div className="topslot">🏆 {titleOfObjectWithMaxWinning1}₽|{titleOfObjectWithMaxWinning}</div>
              <table id="table_fixed">
                <thead>
                  <tr>
                    <th>Balance</th>
                    <th style={{ textAlign: 'right' }}>{totalprofit}💰</th>
                  </tr>
                  <tr>
                    <th>Bonuses</th>
                    <th style={{ textAlign: 'right' }}> {result}/{notes.length}🎁</th>
                  </tr>
                  <tr>
                    <th>Profit</th>
                    <th style={{ textAlign: 'right' }}> {(totalAmount-totalprofit)>0?(totalAmount-totalprofit)+"📈":(totalAmount-totalprofit)+"📉"}</th>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>{(totalAmount/totalprofit).toFixed(1)}x📋</th>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>{(totalAmount/totalprofit).toFixed(1)}x📋</th>
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
              {notes.map((user, index) => (
                
  <tr key={index} className={notes.length > 10 ? 'tech-slideshow' : ''}>
    <td>{index + 1}.</td>
    <td style={{textAlign: 'left', color: user.winning === maxWinning.toString() ? '#f8fa79e8' : '' }}>{user.title}</td>
    <td>{user.note}₽</td>
    <td>{user.winning}₽</td>
  </tr>
))}

            </tbody>
          </table>
          <div className="container-bar">
            <div className="progress2 progress-moved">
              <div style={{ width: `${progrbaar}px` }} className="progress-bar2"></div>
            </div>
          </div>
        </div>
      </>
    </main>
  );
}