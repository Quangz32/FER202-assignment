import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "./BlogCard";
import axios from "axios";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      await axios.get("http://localhost:9999/blogs").then((res) => {
        setBlogs(res.data);
      });
    };

    fetchBlogs();
  }, []);

  return (
    <Container className="min-vh-100">
      <h3 className="my-5">Recent Blog</h3>
      <Row>
        {blogs?.map((blog) => (
          <Col key={blog.id} sm={12} md={6} lg={4}>
            <BlogCard blog={blog}></BlogCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
