'use client'
import SideArt from "../components/UI/SideArt";
import ChangePassword from "./ChangePassword";
import { useSearchParams } from 'next/navigation'

function NewPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
    return (
      <div className="PageColumns">
        <SideArt />
        <ChangePassword token={token} />
      </div>
    );
  }

  export default NewPassword;