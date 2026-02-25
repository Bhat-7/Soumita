import "./Avatar.css";

type AvatarProps = {
  profileImage: string;
};

const Avatar = ({ profileImage }: AvatarProps) => {
  return (
    <div className="avatar-container">
      <img src={profileImage} alt="Profile" className="avatar-image" />
      <div className="avatar-border"></div>
    </div>
  );
};
export default Avatar;
