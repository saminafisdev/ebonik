import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  InputNumber,
  Space,
  Typography,
  Popconfirm,
  message,
} from "antd";
import type { TableProps } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  useDeleteCartItemMutation,
  useGetUserCartQuery,
} from "@/app/services/cart";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const { Title, Text } = Typography;

interface CartTableItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { data: cart, isLoading } = useGetUserCartQuery(undefined, {
    skip: !user,
  });
  const [deleteCartItem] = useDeleteCartItemMutation();

  const [cartItems, setCartItems] = useState<CartTableItem[]>([]);

  // Populate cartItems when API data arrives
  useEffect(() => {
    if (cart?.items) {
      const mapped = cart.items.map((item) => ({
        id: item.id.toString(),
        name: item.product.name,
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        image: item.product.images[0]?.image || "",
      }));
      setCartItems(mapped);
    }
  }, [cart]);

  const handleQuantityChange = (id: string, newQuantity: number | null) => {
    if (!newQuantity || newQuantity <= 0) {
      message.error("Quantity must be at least 1");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (id: string) => {
    await deleteCartItem(id);
    message.success("Item removed from cart");
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const columns: TableProps<CartTableItem>["columns"] = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.image}
            alt={text}
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `৳${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => `৳${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to remove this item?"
          onConfirm={() => handleRemoveItem(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>
        <ShoppingCartOutlined /> Shopping Cart
      </Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <Table<CartTableItem>
            loading={isLoading}
            columns={columns}
            dataSource={cartItems}
            rowKey="id"
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <Text strong>Subtotal</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text strong>৳{calculateSubtotal().toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" size="large">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
