import getCookies from "../utils/getCookies";
import apiHandler from "../utils/apiHandler"
import { redirect } from 'next/navigation'

async function Profile() {
  const cookies = await getCookies();
  const token = cookies.value;

  if (!token) {
    redirect('/login');
  }
  
  const user_info = await apiHandler('/user-info', 'GET', "");
  redirect(`/profile/${user_info.username}`);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
