from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from api.database.database import engine
from api.models.models import Base
from dotenv import load_dotenv
from api.services.shopify_service import ShopifyService
from api.routers import products
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()
shopify_service = ShopifyService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(products.router)
@app.get("/")

async def root():
    return {"message": "Shopify Product Manager API"}
