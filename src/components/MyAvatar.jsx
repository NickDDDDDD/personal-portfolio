import photo from "../assets/images/avatar/photo.png";

const MyAvatar = () => {
  return (
    <img
      src={photo}
      alt="Ultraman"
      className="w-1/5 min-w-[150px] h-auto mt-8 shadow-lg rounded-full"
      style={{ boxShadow: "0px 0px 15em rgba(255, 175, 27, 0.5)" }}
    />
  );
};

export default MyAvatar;
