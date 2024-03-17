'use client'
import ProfileName from "./Profile_name.jsx";
import ProfileAbout from "./Profile_about.jsx";
import ProfileSocial from "./Profile_social.jsx";
import ProfileAdvanced from "./Profile_advanced.jsx";
import ProfileImages from "./Profile_images.jsx";
import SettingItem from "../../components/UI/SettingItem.jsx"

function Home() {
  return (
    <div className="settings--container">
      <div className="settings--content">
        <h2>Customize profile</h2>
        <h3 className="uppercase-h3-description">Profile Information</h3>
        <ProfileName />
        <ProfileAbout />
        <ProfileSocial />
        <h3 className="uppercase-h3-description">Images</h3>
        <ProfileImages />
        <h3 className="uppercase-h3-description">Profile Category</h3>
        <SettingItem
          option={{
            id: 13,
            title: "NSFW",
            description:
              "This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)",
          }}
        />
        <h3 className="uppercase-h3-description">Advanced</h3>

        <ProfileAdvanced />
        <h3 className="uppercase-h3-description">Profile Moderation</h3>
        <div />
        <div className="bottom-text">
          For moderation tools please visit our{" "}
          <a href="/moderation">Profile Moderation page</a>
        </div>
      </div>
    </div>
  );
}

export default Home;