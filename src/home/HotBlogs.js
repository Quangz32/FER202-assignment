import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "../blog/BlogCard";
import axios from "axios";

export default function HotBlogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      await axios.get("http://localhost:9999/blogs").then((res) => {
        setBlogs(res.data.slice(0, 3));
      });
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <h3 className="mb-4">Recent Blog</h3>
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
