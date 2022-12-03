import { Route, Routes } from "react-router-dom";
import Error404 from "components/error/Error404";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />

      <Route path="/" element={<ProtectedRoute element={<Home />} />} />

      <Route path="/login" element={<PublicRoute element={<Login />} />} />

      <Route path="/forgot" element={<PublicRoute element={<Forgot />} />} />

      <Route
        path="/password-reset/:token"
        element={<PublicRoute element={<PasswordReset />} />}
      />

      <Route
        path="/business"
        element={<ProtectedRoute element={<MyBusiness />} />}
      />

      <Route
        path="/customers"
        element={<ProtectedRoute element={<Customers />} />}
      />

      <Route
        path="/pages"
        element={<ProtectedRoute element={<SitePages />} />}
      />
      <Route path="/page" element={<ProtectedRoute element={<PageNew />} />} />
      <Route
        path="/pages/:id"
        element={<ProtectedRoute element={<PageUpdate />} />}
      />

      <Route
        path="/settings"
        element={<ProtectedRoute element={<Settings />} />}
      />

      <Route
        path="/banners"
        element={<ProtectedRoute element={<Banners />} />}
      />
      <Route
        path="/banner"
        element={<ProtectedRoute element={<BannerNew />} />}
      />
      <Route
        path="/banner/:id"
        element={<ProtectedRoute element={<BannerUpdate />} />}
      />

      <Route
        path="/slider-banners"
        element={<ProtectedRoute element={<SliderBanners />} />}
      />
      <Route
        path="/slider-banner"
        element={<ProtectedRoute element={<SiteBannerNew />} />}
      />
      <Route
        path="/slider-banner/:id"
        element={<ProtectedRoute element={<SliderBannerUpdate />} />}
      />

      <Route
        path="/promotional-banners"
        element={<ProtectedRoute element={<PromotionalBanners />} />}
      />
      <Route
        path="/promotional-banner"
        element={<ProtectedRoute element={<PromotionalBannerNew />} />}
      />
      <Route
        path="/promotional-banner/:id"
        element={<ProtectedRoute element={<PromotionalBannerUpdate />} />}
      />

      <Route
        path="/categories"
        element={<ProtectedRoute element={<Categories />} />}
      />
      <Route
        path="/categories/new"
        element={<ProtectedRoute element={<CategoryNew />} />}
      />
      <Route
        path="/categories/:id"
        element={<ProtectedRoute element={<CategoryUpdate />} />}
      />

      <Route
        path="/products"
        element={<ProtectedRoute element={<Products />} />}
      />
      <Route
        path="/products/new"
        element={<ProtectedRoute element={<ProductNew />} />}
      />
      <Route
        path="/products/:id"
        element={<ProtectedRoute element={<ProductUpdate />} />}
      />

      <Route
        path="/attributes"
        element={<ProtectedRoute element={<Attributes />} />}
      />
      <Route
        path="/attributes/new"
        element={<ProtectedRoute element={<AttributeNew />} />}
      />
      <Route
        path="/attributes/:id"
        element={<ProtectedRoute element={<AttributeUpdate />} />}
      />

      <Route path="/order" element={<ProtectedRoute element={<Orders />} />} />
      <Route
        path="/orders/created"
        element={<ProtectedRoute element={<OrdersStatusCreated />} />}
      />
      <Route
        path="/orders/paid"
        element={<ProtectedRoute element={<OrdersStatusPaid />} />}
      />
      <Route
        path="/orders/separation"
        element={<ProtectedRoute element={<OrdersStatusSeparation />} />}
      />
      <Route
        path="/orders/dispatched"
        element={<ProtectedRoute element={<OrdersStatusDispatched />} />}
      />
      <Route
        path="/orders/completed"
        element={<ProtectedRoute element={<OrdersStatusCompleted />} />}
      />
      <Route
        path="/orders/canceled"
        element={<ProtectedRoute element={<OrdersStatusCanceled />} />}
      />

      <Route
        path="/manufacturers"
        element={<ProtectedRoute element={<Manufacturers />} />}
      />
      <Route
        path="/manufacturer/new"
        element={<ProtectedRoute element={<ManufacturerNew />} />}
      />
      <Route
        path="/manufacturer/:id"
        element={<ProtectedRoute element={<ManufacturerUpdate />} />}
      />

      <Route
        path="/payments"
        element={<ProtectedRoute element={<Payment />} />}
      />

      <Route
        path="/account"
        element={<ProtectedRoute element={<Account />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
