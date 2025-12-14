import { useEffect, useRef } from "react";
import { createTeleporter } from "react-teleporter";

type Props = {
  closeModal: Function;
};

const BuyWithCardModalTeleport = createTeleporter();

export function BuyWithCardModalTarget() {
  return <BuyWithCardModalTeleport.Target />;
}

export function BuyWithCardModal({ closeModal }: Props) {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const clickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const childElement = dialog.current;
    if (
      event.target instanceof HTMLElement &&
      childElement &&
      !childElement.contains(event.target)
    ) {
      closeModal();
    }
  };
  return (
    <BuyWithCardModalTeleport.Source>
      <div
        className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-backdrop/50"
        onClick={clickOutside}
      >
        <div ref={dialog} className="card w-full max-w-xl">
          <h4 className="mx-3 mt-2 mb-4 flex items-center justify-between text-xl font-bold uppercase text-white">
            <span>Buy BNB with card</span>
            <button
              type="button"
              onClick={() => closeModal()}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </h4>
          <iframe
            title="Transak"
            id="transak"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
            height="750"
            className="block w-full rounded-lg border"
            src="https://global.transak.com/"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      </div>
    </BuyWithCardModalTeleport.Source>
  );
}
