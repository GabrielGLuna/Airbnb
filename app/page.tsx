import Categories from "./components/Categories/Categories";
import PropertyList from "./components/properties/PropertyList";
export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories/>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <PropertyList/>
      </div>
    </main>
  );
}
