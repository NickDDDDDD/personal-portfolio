import HoverButton from "../components/buttons/HoverButton.jsx";
import TypeText from "/src/components/typography/TypeText.jsx";

const ContactSection = () => {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center gap-10 rounded-xl border-2 border-[#ff3d00] bg-stone-200 md:h-[95vh]">
      <TypeText
        textString={[
          "Click the button to get in touch with me.",
          "Let's build something amazing together!",
        ]}
        className="text-3xl"
      />

      <HoverButton>Contact me</HoverButton>
    </section>
  );
};

export default ContactSection;
