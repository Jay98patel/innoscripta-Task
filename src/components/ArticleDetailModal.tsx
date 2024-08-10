// src/components/ArticleDetailModal.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ArticleDetailModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null); // Define the type based on your data structure

  useEffect(() => {
    // Fetch the article details using the id
    // Example: fetchArticleById(id).then(setArticle);
  }, [id]);

  return (
    <Modal
      show={true}
      onHide={() => {
        /* handle close */
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{article?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{article?.content}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            /* handle close */
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArticleDetailModal;
