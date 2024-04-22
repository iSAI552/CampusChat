import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link className="text-white text-2xl font-bold" to="/">Your App</Link>
          <div className="hidden md:block">
            <ul className="flex space-x-4 text-white">
              <li className="relative">
                <span className="hover:text-gray-300 cursor-pointer">Posts</span>
                <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden">
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/create">Create</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/update">Update</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/delete">Delete</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/get">Get</Link></li>
                </ul>
              </li>
              {/* Other list items for User, Vote, and Comment */}
              <li className="relative">
              <span className="hover:text-gray-300 cursor-pointer">User</span>
              <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden">
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/create">Create</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/update">Update</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/delete">Delete</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/get">Get</Link></li>
                </ul>
            </li>
              <li className="relative">
              <span className="hover:text-gray-300 cursor-pointer">Vote</span>
              <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden">
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/create">Create</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/update">Update</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/delete">Delete</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/get">Get</Link></li>
                </ul>
            </li>
              <li className="relative">
              <span className="hover:text-gray-300 cursor-pointer">Comment</span>
              <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden">
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/create">Create</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/update">Update</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/delete">Delete</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/posts/get">Get</Link></li>
                </ul>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
