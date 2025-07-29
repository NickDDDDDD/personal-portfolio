import MyAvatar from "../components/MyAvatar.jsx";
import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";

const IntroSection = () => {
  return (
    <div className="h-[60vh] rounded-2xl bg-[#000000] md:h-[95vh]">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <ResponsiveTypography variant="h2" className="text-[#fafafa]">
          Hello, my name is
        </ResponsiveTypography>
        <ResponsiveTypography variant="h1" className="font-bold text-[#ffaf1b]">
          Nick
        </ResponsiveTypography>

        <MyAvatar />
      </div>
    </div>
  );
};

export default IntroSection;
