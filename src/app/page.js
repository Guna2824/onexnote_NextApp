"use client";

import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 w-full z-50 flex justify-between md:px-20 items-center p-5 bg-gray-100 border-b border-gray-300">
        <div className="text-2xl font-bold text-gray-800">ONEXNote</div>
        <Link href="/note">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Note
          </button>
        </Link>
      </header>

      {/* Body Sections */}
      <main className="flex-1 p-5 md:px-[10%] md:py-8 ">
        {/* Section 1 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1">
            <img src="/images/quicknot.jpg" alt="Random Notepad" className="w-full max-w-sm" />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Take Notes Quickly and Easily</h2>
            <p className="text-gray-600 mb-4">
              ONEXNote helps you capture important ideas, thoughts, and lists efficiently.
            </p>
            <Link href="/note">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Note
              </button>
            </Link>
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Manage Multiple Notes at Once</h2>
            <p className="text-gray-600 mb-4">
              Create and edit multiple notes simultaneously, all in one place.
            </p>
            <Link href="/screenplayhub">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                screenplayhub
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img src="/images/multiplenote.jpg" alt="Multiple Notes" className="w-full max-w-sm" />
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1">
            <img src="/images/TextNote.jpg" alt="Text Style Change" className="w-full max-w-sm" />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Customizable Text Styles</h2>
            <p className="text-gray-600 mb-4">
              Change the text style of your notes to match your preferences and mood.
            </p>
            <Link href="/keywordgenerator">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                keywordgenerator
              </button>
            </Link>
          </div>
        </section>

        {/* Section 4 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Take Notes Quickly and Easily</h2>
            <p className="text-gray-600 mb-4">
              ONEXNote helps you capture important ideas, thoughts, and lists efficiently.
            </p>
            <Link href="/note">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Note
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img src="/images/quicknot.jpg" alt="Random Notepad" className="w-full max-w-sm" />
          </div>
        </section>

        {/* Section 5 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1">
            <img src="/images/multiplenote.jpg" alt="Multiple Notes" className="w-full max-w-sm" />
          </div>
          <div className="flex-1 p-5 order-2 md:order-1">
            <h2 className="text-2xl mb-2">Search Through Your Notes</h2>
            <p className="text-gray-600 mb-4">
            Quickly find notes by their title or content using the search feature.
            </p>
            <Link href="/tables">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Tables
              </button>
            </Link>
          </div>
        </section>

        {/* Section 6 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Download Your Notes</h2>
            <p className="text-gray-600 mb-4">
            Save your notes as text files and access them anytime, anywhere.
            </p>
            <Link href="/calculator">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Calculator
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img src="/images/TextNote.jpg" alt="Text Style Change" className="w-full max-w-sm" />
          </div>
        </section>

        {/* Section 7 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1">
            <img src="/images/quicknot.jpg" alt="Random Notepad" className="w-full max-w-sm" />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Search Through Your Notes</h2>
            <p className="text-gray-600 mb-4">
            Quickly find notes by their title or content using the search feature.
            </p>
            <Link href="/calendyear">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Calendyear
              </button>
            </Link>
          </div>
        </section>

        {/* Section 8 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Take Notes Quickly and Easily</h2>
            <p className="text-gray-600 mb-4">
              ONEXNote helps you capture important ideas, thoughts, and lists efficiently.
            </p>
            <Link href="/note">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Note
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img src="/images/quicknot.jpg" alt="Random Notepad" className="w-full max-w-sm" />
          </div>
        </section>

        {/* Section 9 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1">
            <img src="/images/quicknot.jpg" alt="Random Notepad" className="w-full max-w-sm" />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Take Notes Quickly and Easily</h2>
            <p className="text-gray-600 mb-4">
              ONEXNote helps you capture important ideas, thoughts, and lists efficiently.
            </p>
            <Link href="/note">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Note
              </button>
            </Link>
          </div>
        </section>

        {/* Section 10 */}
        <section className="flex flex-wrap mb-12">
          <div className="flex-1 p-5">
            <h2 className="text-2xl mb-2">Download Your Notes</h2>
            <p className="text-gray-600 mb-4">
            Save your notes as text files and access them anytime, anywhere.
            </p>
            <Link href="/eventreminder">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Event Reminder
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img src="/images/TextNote.jpg" alt="Text Style Change" className="w-full max-w-sm" />
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 text-center p-5">
        <ul className="list-none p-0">
          <li className="inline-block p-1 my-1 mx-2 hover:underline underline-offset-4">
            <Link href="/termsandconditions">
              Terms & Conditions
            </Link>
          </li>
          <li className="inline-block p-1 my-1 mx-2 hover:underline underline-offset-4">
            <Link href="/privacypolicy">
              Privacy Policy
            </Link>
          </li>
          <li className="inline-block p-1 my-1 mx-2 hover:underline underline-offset-4">
            <Link href="/contactus">
              Contact Us
            </Link>
          </li>
          <li className="inline-block p-1 my-1 mx-2 hover:underline underline-offset-4">
            <Link href="/aboutus">
              About Us
            </Link>
          </li>
          <li className="inline-block p-1 my-1 mx-2 hover:underline underline-offset-4">
            <Link href="/cookies">
              Cookies
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
