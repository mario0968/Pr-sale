const InfoImagesSection = () => {
  return (
    <section className="bg-[#0a0a0a] py-16 px-5">
      <div className="container mx-auto">
        <img
          src="https://i.ibb.co/KpkfG7qn/IMG-20250911-WA0094.jpg"
          alt="Info 1"
          className="w-full block mb-0"
        />
        <img
          src="https://i.ibb.co/zHs07TrS/IMG-20250916-WA0139.jpg"
          alt="Info 2"
          className="w-full block mb-0"
        />
        <img
          src="https://i.ibb.co/cXRp9H8M/IMG-20250917-WA0003.jpg"
          alt="Info 3"
          className="w-full block mb-0"
        />
        <div className="text-center my-8">
          <img
            src="https://i.ibb.co/YgXRxVN/IMG-20251102-WA0029.jpg"
            alt="Special"
            className="max-w-full rounded-xl shadow-[0_4px_16px_rgba(255,215,0,0.3)] inline-block"
          />
        </div>
        <div className="text-center my-8">
          <img
            src="https://i.ibb.co/Y78cDcsB/IMG-20251031-WA0146.jpg"
            alt="Featured"
            className="max-w-full w-full md:w-[800px] rounded-xl inline-block"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoImagesSection;

