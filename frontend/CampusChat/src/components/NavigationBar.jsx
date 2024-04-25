import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  // Check if the current location matches the OTP page route
  const isOtpPage = location.pathname === '/otp';

  // Check if the current location matches the Sign Up page route
  const isSignUpPage = location.pathname === '/signup';

  // Check if the current location matches the Login page route
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link className="text-white text-2xl font-bold" to="/otp">Your App</Link>
          <div className="hidden md:block">
            <ul className="flex space-x-4 text-white">
              {/* Condition for OTP page */}
              {isOtpPage && (
                <li>
                  <Link className="text-white hover:text-gray-300" to="/login">Log In</Link>
                </li>
              )}
              {/* Condition for Sign Up page */}
              {isSignUpPage && (
                <li>
                  <Link className="text-white hover:text-gray-300" to="/otp">OTP</Link>
                </li>
              )}
              {/* Condition for Login page */}
              {isLoginPage && (
                <li>
                  <Link className="text-white hover:text-gray-300" to="/signup">Sign Up</Link>
                </li>
              )}
              {/* Navigation items for other pages */}
              {!isOtpPage && !isSignUpPage && !isLoginPage && (
                <>
                  <li className="relative group">
                    <span className="hover:text-gray-300 cursor-pointer group">Posts</span>
                    <div className="hidden group-hover:block">
                      <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden group-hover:block">
                        <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/createpost">Create</Link></li>
                        <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/updatepost">Update</Link></li>
                        <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/deletepost">Delete</Link></li>
                        <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/getpost">Get</Link></li>
                        <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/getallposts">Get All</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li className="relative group">
                    <span className="hover:text-gray-300 cursor-pointer">Vote</span>
                    <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden group-hover:block">
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/votepost">Vote Post</Link></li>
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/votecomment">Vote Comment</Link></li>
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/upvotedposts">Upvoted Posts</Link></li>
                    </ul>
                  </li>
                  <li className="relative group">
                    <span className="hover:text-gray-300 cursor-pointer">Comment</span>
                    <ul className="absolute top-full left-0 mt-1 bg-gray-700 shadow-lg rounded-lg hidden group-hover:block">
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/addpostcomment">Add Post Comment</Link></li>
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/getpostcomment">Get Post Comment</Link></li>
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/updatepostcomment">Update Post Comment</Link></li>
                      <li><Link className="block px-4 py-2 hover:bg-gray-600" to="/deletepostcomment">Delete Post Comment</Link></li>
                    </ul>
                  </li>
                  <li>
                      <Link className="text-white hover:text-gray-300" to="/logout">Log Out</Link>
                    </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
