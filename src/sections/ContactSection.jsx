import HoverButton from "../components/reuse-components/buttons/HoverButton.jsx";
import TypeText from "/src/components/reuse-components/typography/TypeText.jsx";

const ContactSection = () => {
  return (
    <section className="h-[60vh] md:h-[95vh] flex flex-col items-center justify-center bg-stone-200 rounded-xl border-2 border-[#ff3d00]">
      <TypeText
        textString={[
          "Click the button to get in touch with me.",
          "Let's build something amazing together!",
        ]}
      />

      <HoverButton>Contact me</HoverButton>
    </section>
  );
};

export default ContactSection;
