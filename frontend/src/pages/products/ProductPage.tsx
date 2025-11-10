import { useState } from "react";
import { Row, Col, Breadcrumb, Select, Button, Drawer } from "antd";
import { FilterIcon, HomeIcon } from "lucide-react";
import { useGetProductsQuery } from "@/app/services/products";
import { Link } from "react-router";
import ProductCard from "./components/ProductCard";

// interface ProductsPageProps {
//   onNavigate: (page: string) => void;
// }

export default function ProductsPage() {
  // const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {
    data: paginatedProducts = [],
    isLoading,
    isError,
  } = useGetProductsQuery();
  // const [filters, setFilters] = useState<FilterState>({
  //   priceRange: [0, 500],
  //   brands: [],
  //   ratings: [],
  //   categories: [],
  //   searchQuery: "",
  // });

  // const pageSize = 12;

  // const filteredAndSortedProducts = useMemo(() => {
  //   let filtered = [...products];

  //   if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
  //     filtered = filtered.filter(
  //       (p) =>
  //         p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  //     );
  //   }

  //   if (filters.brands.length > 0) {
  //     filtered = filtered.filter((p) => filters.brands.includes(p.brand));
  //   }

  //   if (filters.ratings.length > 0) {
  //     filtered = filtered.filter((p) =>
  //       filters.ratings.some((rating) => p.rating >= rating)
  //     );
  //   }

  //   if (filters.categories.length > 0) {
  //     filtered = filtered.filter((p) =>
  //       filters.categories.includes(p.category)
  //     );
  //   }

  //   switch (sortBy) {
  //     case "price-low":
  //       filtered.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-high":
  //       filtered.sort((a, b) => b.price - a.price);
  //       break;
  //     case "rating":
  //       filtered.sort((a, b) => b.rating - a.rating);
  //       break;
  //     case "newest":
  //       break;
  //     default:
  //       break;
  //   }

  //   return filtered;
  // }, [filters, sortBy]);

  // const paginatedProducts = useMemo(() => {
  //   const startIndex = (currentPage - 1) * pageSize;
  //   return filteredAndSortedProducts.slice(startIndex, startIndex + pageSize);
  // }, [filteredAndSortedProducts, currentPage]);

  // const FilterSidebar = () => (
  //   <div>
  //     <div style={{ marginBottom: "30px" }}>
  //       <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>Price Range</h3>
  //       <Slider
  //         range
  //         min={0}
  //         max={500}
  //         value={filters.priceRange}
  //         onChange={(value) =>
  //           setFilters({ ...filters, priceRange: value as [number, number] })
  //         }
  //         tooltip={{ formatter: (value) => `$${value}` }}
  //       />
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           marginTop: "10px",
  //         }}
  //       >
  //         <span>${filters.priceRange[0]}</span>
  //         <span>${filters.priceRange[1]}</span>
  //       </div>
  //     </div>

  //     <div style={{ marginBottom: "30px" }}>
  //       <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>Categories</h3>
  //       <Checkbox.Group
  //         options={categories.map((c) => ({ label: c.name, value: c.name }))}
  //         value={filters.categories}
  //         onChange={(values) =>
  //           setFilters({ ...filters, categories: values as string[] })
  //         }
  //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  //       />
  //     </div>

  //     <div style={{ marginBottom: "30px" }}>
  //       <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>Brands</h3>
  //       <Checkbox.Group
  //         options={brands.map((b) => ({ label: b, value: b }))}
  //         value={filters.brands}
  //         onChange={(values) =>
  //           setFilters({ ...filters, brands: values as string[] })
  //         }
  //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  //       />
  //     </div>

  //     <div style={{ marginBottom: "30px" }}>
  //       <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>Rating</h3>
  //       <Checkbox.Group
  //         value={filters.ratings}
  //         onChange={(values) =>
  //           setFilters({ ...filters, ratings: values as number[] })
  //         }
  //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  //       >
  //         {[4, 3, 2, 1].map((rating) => (
  //           <Checkbox key={rating} value={rating}>
  //             <Rate
  //               disabled
  //               defaultValue={rating}
  //               style={{ fontSize: "14px" }}
  //             />
  //             <span style={{ marginLeft: "8px" }}>& Up</span>
  //           </Checkbox>
  //         ))}
  //       </Checkbox.Group>
  //     </div>

  //     <Button
  //       block
  //       onClick={() =>
  //         setFilters({
  //           priceRange: [0, 500],
  //           brands: [],
  //           ratings: [],
  //           categories: [],
  //           searchQuery: "",
  //         })
  //       }
  //     >
  //       Clear All Filters
  //     </Button>
  //   </div>
  // );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "30px 20px" }}>
      <Breadcrumb
        style={{ marginBottom: "30px" }}
        items={[
          {
            title: (
              <Link to={"/"} style={{ cursor: "pointer" }}>
                <HomeIcon size={20} />
              </Link>
            ),
          },
          { title: "Products" },
        ]}
      />

      <Row gutter={[32, 32]}>
        {/* <Col xs={0} lg={6}>
          <Card title="Filters" style={{ position: "sticky", top: "80px" }}>
            <FilterSidebar />
          </Card>
        </Col> */}

        <Col xs={24} lg={18}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                All Products
              </h1>
              {/* <p style={{ color: "#666", margin: "5px 0 0 0" }}>
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(
                  currentPage * pageSize,
                  filteredAndSortedProducts.length
                )}{" "}
                of {filteredAndSortedProducts.length} results
              </p> */}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Button
                icon={<FilterIcon />}
                onClick={() => setDrawerVisible(true)}
                className="mobile-filter-btn"
                style={{ display: "none" }}
              >
                Filters
              </Button>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 180 }}
                options={[
                  { label: "Featured", value: "featured" },
                  { label: "Price: Low to High", value: "price-low" },
                  { label: "Price: High to Low", value: "price-high" },
                  { label: "Highest Rated", value: "rating" },
                  { label: "Newest", value: "newest" },
                ]}
              />
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
            {paginatedProducts.map((product) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* {filteredAndSortedProducts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#999",
              }}
            >
              <h3 style={{ fontSize: "20px", color: "#999" }}>
                No products found
              </h3>
              <p>Try adjusting your filters</p>
            </div>
          )} */}

          {/* {filteredAndSortedProducts.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={currentPage}
                total={filteredAndSortedProducts.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          )} */}
        </Col>
      </Row>

      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {/* <FilterSidebar /> */}
      </Drawer>

      <style>{`
        @media (max-width: 992px) {
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
