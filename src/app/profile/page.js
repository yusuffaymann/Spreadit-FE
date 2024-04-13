import getCookies from "../utils/getCookies";
import apiHandler from "../utils/apiHandler"
import { redirect } from 'next/navigation'

async function Profile() {
  const cookies = await getCookies();

  if (cookies === null) {
    redirect('/login');
  }

  try{
    const user_info = await apiHandler('/user-info', 'GET', "");
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/login');
  }
  redirect(`/profile/${user_info.username}`);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
