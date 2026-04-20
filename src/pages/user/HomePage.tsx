import HomeHero from "@/components/home/HomeHero";
import LatestReleases from "@/components/home/LatestReleases";

const HomePage = () => {
  return (
    <div className="space-y-6">
      <HomeHero />
      <LatestReleases />
    </div>
  );
};

export default HomePage;
