const Hero = () => {
  return (
    <iframe
      src={
        "https://heroswap.com/widget?" +
        "affiliateName=LoveSwap&" +
        "theme=dark-blue&" +
        "depositTicker=ETH&" +
        "destinationTicker=SOL"
      }
      style={{
        width: "100%",
        height: "100%",
        border: "none",

      }}
      title="Hero Swap Widget"
    ></iframe>
  );
};

export default Hero;
