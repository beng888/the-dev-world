import Link from "next/link";
import { useContext } from "react";
import { SmoothScrollContext } from "../contexts/SmoothScroll.context";

export default function About() {
  const { scroll } = useContext(SmoothScrollContext);

  const goToSecondPart = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo("#second-part");
  };

  const goToTop = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo(0);
  };

  return (
    <div data-scroll-section>
      <Link href="/">
        <a>Home page</a>
      </Link>
      <h1 data-scroll data-scroll-position="top" data-scroll-speed="-1">
        About page
      </h1>
      <div>
        <a href="#second-part" onClick={goToSecondPart}>
          Go to second part
        </a>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a massa sed
        ligula posuere tempor ut nec erat. Vivamus ac est sed felis viverra
        pharetra vitae vel arcu. Praesent dictum volutpat augue, et eleifend
        sem. Etiam et ante suscipit, mattis metus sed, ornare enim. Proin vitae
        pharetra eros, in elementum nisi. Integer finibus augue urna, eu
        vehicula turpis lobortis vitae. Nulla facilisi. Sed scelerisque
        fringilla odio, ut tristique justo consequat eu. Ut at iaculis metus.
        Suspendisse eros lectus, venenatis ac viverra vitae, efficitur ut nisi.
        Sed dignissim diam sit amet pharetra lacinia. Phasellus molestie blandit
        interdum. Aenean auctor, magna vel porta porttitor, nibh odio feugiat
        dui, ultricies scelerisque lectus est non magna. In vitae turpis eu
        ligula pretium iaculis. Donec gravida dolor volutpat tellus porta
        faucibus. Integer interdum, nisi vitae vehicula pulvinar, elit tellus
        faucibus mauris, vitae maximus dui ante pulvinar turpis. Curabitur
        fringilla orci egestas lacus hendrerit, ac hendrerit sem scelerisque.
        Vestibulum fringilla diam sit amet mattis vulputate. Vivamus ac pretium
        urna. Proin malesuada ipsum arcu, sed faucibus mauris cursus sit amet.
        Pellentesque consequat, leo sed consectetur faucibus, erat nisl gravida
        turpis, nec vestibulum magna dui non ligula. Donec non semper lacus. Sed
        a vehicula mauris. Aliquam at bibendum dui. Fusce pellentesque blandit
        tempus. Donec ultrices porttitor dolor at faucibus. Sed consectetur sit
        amet nulla id varius. Maecenas et aliquet est. Fusce id tristique
        turpis. Aenean eget blandit felis, tempus finibus lectus. Etiam in erat
        non felis tristique consequat suscipit eu velit. Fusce nulla magna,
        congue id ipsum ac, bibendum pellentesque quam. Quisque ex quam, pretium
        ut lorem ut, euismod dignissim dui. Nulla euismod elit fermentum dui
        pharetra hendrerit. Proin dignissim id lacus sit amet sollicitudin.
        Donec elementum hendrerit quam ut bibendum. In at metus at mauris mollis
        fringilla. Mauris efficitur maximus libero, ac molestie elit. Cras felis
        sem, sagittis a porttitor quis, semper vel ipsum. Nullam eget libero
        convallis, ullamcorper justo non, hendrerit leo. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Suspendisse facilisis non libero sed
        condimentum. Donec nisi justo, consectetur ac ornare sit amet, tristique
        non sem. Maecenas ac hendrerit erat, non lacinia nunc. Maecenas ultrices
        orci at neque varius, ac lacinia elit congue. Vivamus sed tellus est.
        Quisque vitae magna nec risus pharetra condimentum id eu turpis. Proin
        diam urna, congue ut pharetra id, blandit vitae enim. Nulla nec nulla
        mi. Suspendisse hendrerit mi in dolor vehicula viverra. Maecenas tortor
        justo, sagittis eget velit accumsan, consectetur auctor nulla. Integer
        varius ultrices mollis. Fusce placerat ex et velit iaculis commodo. Nunc
        vel lectus eu dui condimentum pellentesque ut non dolor. Vestibulum eget
        sem quis ligula volutpat luctus. Donec varius pretium purus, vel
        sollicitudin velit. Proin facilisis vestibulum purus, vel dignissim
        tortor ultricies eget. Aliquam volutpat augue eget tristique semper.
      </p>
      <div data-scroll data-scroll-speed="1" className="picture-container">
        <img
          className="picture"
          src="https://picsum.photos/800/500"
          alt="tadaam"
        />
      </div>
      <div id="second-part">
        <h2>Second part!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a massa
          sed ligula posuere tempor ut nec erat. Vivamus ac est sed felis
          viverra pharetra vitae vel arcu. Praesent dictum volutpat augue, et
          eleifend sem. Etiam et ante suscipit, mattis metus sed, ornare enim.
          Proin vitae pharetra eros, in elementum nisi. Integer finibus augue
          urna, eu vehicula turpis lobortis vitae. Nulla facilisi. Sed
          scelerisque fringilla odio, ut tristique justo consequat eu. Ut at
          iaculis metus. Suspendisse eros lectus, venenatis ac viverra vitae,
          efficitur ut nisi. Sed dignissim diam sit amet pharetra lacinia.
          Phasellus molestie blandit interdum. Aenean auctor, magna vel porta
          porttitor, nibh odio feugiat dui, ultricies scelerisque lectus est non
          magna. In vitae turpis eu ligula pretium iaculis. Donec gravida dolor
          volutpat tellus porta faucibus. Integer interdum, nisi vitae vehicula
          pulvinar, elit tellus faucibus mauris, vitae maximus dui ante pulvinar
          turpis. Curabitur fringilla orci egestas lacus hendrerit, ac hendrerit
          sem scelerisque. Vestibulum fringilla diam sit amet mattis vulputate.
          Vivamus ac pretium urna. Proin malesuada ipsum arcu, sed faucibus
          mauris cursus sit amet. Pellentesque consequat, leo sed consectetur
          faucibus, erat nisl gravida turpis, nec vestibulum magna dui non
          ligula. Donec non semper lacus. Sed a vehicula mauris. Aliquam at
          bibendum dui. Fusce pellentesque blandit tempus. Donec ultrices
          porttitor dolor at faucibus. Sed consectetur sit amet nulla id varius.
          Maecenas et aliquet est. Fusce id tristique turpis. Aenean eget
          blandit felis, tempus finibus lectus. Etiam in erat non felis
          tristique consequat suscipit eu velit. Fusce nulla magna, congue id
          ipsum ac, bibendum pellentesque quam. Quisque ex quam, pretium ut
          lorem ut, euismod dignissim dui. Nulla euismod elit fermentum dui
          pharetra hendrerit. Proin dignissim id lacus sit amet sollicitudin.
          Donec elementum hendrerit quam ut bibendum. In at metus at mauris
          mollis fringilla. Mauris efficitur maximus libero, ac molestie elit.
          Cras felis sem, sagittis a porttitor quis, semper vel ipsum. Nullam
          eget libero convallis, ullamcorper justo non, hendrerit leo. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          facilisis non libero sed condimentum. Donec nisi justo, consectetur ac
          ornare sit amet, tristique non sem. Maecenas ac hendrerit erat, non
          lacinia nunc. Maecenas ultrices orci at neque varius, ac lacinia elit
          congue. Vivamus sed tellus est. Quisque vitae magna nec risus pharetra
          condimentum id eu turpis. Proin diam urna, congue ut pharetra id,
          blandit vitae enim. Nulla nec nulla mi. Suspendisse hendrerit mi in
          dolor vehicula viverra. Maecenas tortor justo, sagittis eget velit
          accumsan, consectetur auctor nulla. Integer varius ultrices mollis.
          Fusce placerat ex et velit iaculis commodo. Nunc vel lectus eu dui
          condimentum pellentesque ut non dolor. Vestibulum eget sem quis ligula
          volutpat luctus. Donec varius pretium purus, vel sollicitudin velit.
          Proin facilisis vestibulum purus, vel dignissim tortor ultricies eget.
          Aliquam volutpat augue eget tristique semper.
        </p>
      </div>
      <a href="#top" onClick={goToTop}>
        Go to top
      </a>
    </div>
  );
}
