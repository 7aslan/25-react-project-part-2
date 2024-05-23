import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect } from "react";
import { useState } from "react";
import "./pdf.css";

function PdfViewComponent({ productDetails }) {
  return (
    <Document>
      <Page>
        <View>
          <Text>{productDetails?.title}</Text>
          <Text>{productDetails?.description}</Text>
          <Text>{productDetails?.category}</Text>
        </View>
      </Page>
    </Document>
  );
}

function PdfViewer() {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const baseURL = "https://dummyjson.com/products?limit=10&skip=0";
  const productDetailsURL = "https://dummyjson.com/products/";

  async function fetchListOfProducts() {
    const res = await fetch(baseURL);
    const result = await res.json();
    if (result && result.products && result.products.length > 0) {
      setProducts(result.products);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  async function handleFetchProductDetails(getId) {
    const res = await fetch(`${productDetailsURL}${getId}`);
    const result = await res.json();

    if (result) {
      setProductDetails(result);
    }
  }

  return (
    <div className="pdf-viewer-container">
      <h1>PDF Viewer</h1>
      <ul>
        {products && products.length > 0
          ? products.map((productItem) => (
              <li
                onClick={() => handleFetchProductDetails(productItem.id)}
                key={productItem.id}
              >
                {productItem.title}
              </li>
            ))
          : null}
      </ul>
      <div className="pdf-viewer-page">
        <PDFViewer style={{ width: "100%", height: "500px" }}>
          <PdfViewComponent productDetails={productDetails} />
        </PDFViewer>
      </div>
      <PDFDownloadLink
        fileName="Product-Details.pdf"
        document={<PdfViewComponent productDetails={productDetails} />}
      >
        <button>Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
}

export default PdfViewer;
