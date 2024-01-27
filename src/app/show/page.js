import Note from "../../../model/Note";
import Delete from "../components/Delete";
import Link from "next/link";
import { redirect } from 'next/navigation'
import dbConnect from "../dbConnect";

export default function show() {
  dbConnect()




  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Notes</h1>
      <div>
        <ul className="flex font-bold">
          <li className="flex-1">Title</li>
          <li className="flex-1">Note</li>
          <li className="flex-1">Options</li>
        </ul>
        </div>
    </main>
  );
}
