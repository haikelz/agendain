const TidakAda = ({ description }: { description: string }) => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <img src="/img/void.svg" width="200px" height="200px" loading="lazy" decoding="async" />
      <h1 className="mt-3 text-xl font-bold">{description}</h1>
    </div>
  );
};

export default TidakAda;
