import { message } from "antd";
import { useAddToCartMutation } from "@/app/services/cart";

export function useAddToCart() {
  const [mutate, { isLoading }] = useAddToCartMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = async (productId: number, quantity: number = 1) => {
    try {
      await mutate({ product_id: productId, quantity }).unwrap();
      messageApi.success("Item added to cart");
    } catch {
      messageApi.error("Failed to add item to cart");
    }
  };

  return { handleAddToCart, isLoading, contextHolder };
}
