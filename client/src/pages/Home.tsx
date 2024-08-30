import {Navbar} from "../components/Navbar";
import {Hero} from "../components/Hero";
import TrendingSection from "../components/TrendingSection";
import Categories from "../components/Categories";


export const Home = () => {
  return (
    <>
    <div className="sticky">
        <Navbar items={["Home","About","Write","Sign in"]}/>
    </div>
    <Hero></Hero>
    <div className="w-full bg-slate-100 flex">
      <div className="h-80 w-2/3">
    <h2 className="text-4xl font-bold ml-10 mb-5">Trending Posts</h2>
    <TrendingSection></TrendingSection>
      </div>
      <div className="w-1/3 ml-10">
        <h3 className="text-2xl font-semibold ml-10 my-5">Categories</h3>
        <Categories></Categories>
      </div>
    </div>
    </>
  )
}
