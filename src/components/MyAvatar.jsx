import photo from "../assets/images/avatar/photo.png";

const MyAvatar = () => {
  return (
    <img
      src={photo}
      alt="Ultraman"
      className="w-1/4 md:w-1/4 lg:w-1/5  min-w-[150px] h-auto  shadow-lg rounded-full m-0"
      style={{ boxShadow: "0px 0px 15em rgba(255, 175, 27, 0.5)" }}
    />
  );
};

export default MyAvatar;
