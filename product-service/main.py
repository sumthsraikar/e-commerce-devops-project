import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Product Catalog Microservice",
    description="Python FastAPI catalog service managing e-commerce inventory and search",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int
    image: str
    description: str

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    stock: int
    image: str
    description: str

# Sample catalog seed data
PRODUCTS_DB: List[Product] = [
    Product(
        id="prod-1",
        name="Cloud Kubernetes Cluster Node",
        category="DevOps Infrastructure",
        price=199.99,
        stock=45,
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        description="High-performance enterprise Kubernetes worker node container pre-configured with Cilium CNI."
    ),
    Product(
        id="prod-2",
        name="Docker Microservices Template",
        category="DevOps Templates",
        price=49.99,
        stock=120,
        image="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80",
        description="Production-ready 5-container Docker Compose pipeline template with automated CI/CD."
    ),
    Product(
        id="prod-3",
        name="Grafana & Prometheus Monitoring Pod",
        category="Monitoring & Observability",
        price=89.99,
        stock=30,
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        description="Real-time metrics aggregator, dashboard exporter, and alertmanager cluster container."
    ),
    Product(
        id="prod-4",
        name="Vault Secrets Manager Pro",
        category="Security",
        price=149.00,
        stock=15,
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        description="Encrypted dynamic secret injection module for distributed microservices."
    ),
    Product(
        id="prod-5",
        name="Nginx High-Speed Load Balancer",
        category="Networking",
        price=79.99,
        stock=88,
        image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
        description="Zero-latency reverse proxy container with HTTP/2, SSL termination, and rate-limiting."
    ),
    Product(
        id="prod-6",
        name="Redis Cache Cluster Service",
        category="Database Services",
        price=129.50,
        stock=50,
        image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        description="Ultra-fast in-memory caching node with persistence strategy for cart & session data."
    )
]

START_TIME = time.time()

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {
        "status": "UP",
        "service": "product-service",
        "framework": "FastAPI (Python 3.11)",
        "uptime_seconds": round(time.time() - START_TIME, 2),
        "product_count": len(PRODUCTS_DB)
    }

@app.get("/products")
def get_products(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    result = PRODUCTS_DB
    if category and category != "All":
        result = [p for p in result if p.category.lower() == category.lower()]
    if search:
        s = search.lower()
        result = [p for p in result if s in p.name.lower() or s in p.description.lower()]
    return {"total": len(result), "products": result}

@app.get("/products/{product_id}")
def get_product_by_id(product_id: str):
    product = next((p for p in PRODUCTS_DB if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product with ID '{product_id}' not found")
    return product

@app.get("/categories")
def get_categories():
    categories = list(set(p.category for p in PRODUCTS_DB))
    return {"categories": ["All"] + categories}

@app.post("/products", status_code=status.HTTP_201_CREATED)
def create_product(product_in: ProductCreate):
    new_id = f"prod-{len(PRODUCTS_DB) + 1}"
    new_prod = Product(id=new_id, **product_in.dict())
    PRODUCTS_DB.append(new_prod)
    return {"message": "Product created successfully", "product": new_prod}
