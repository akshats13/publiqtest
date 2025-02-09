from fastapi import APIRouter, Depends, HTTPException
from typing import List
from api.database.database import get_db
from ..models.models import Product
from sqlalchemy.orm import Session
from api.services.shopify_service import ShopifyService
import json

router = APIRouter(prefix="/products", tags=["products"])
shopify_service = ShopifyService()

@router.post("/", response_model=dict)
def create_product(product_data: dict, db: Session = Depends(get_db)):
    try:
        # Create product in Shopify
        shopify_product = shopify_service.create_product(product_data)
        
        # Format product for database
        db_product_data = shopify_service.format_product_for_db(shopify_product["product"])
        
        # Save product to database
        db_product = Product(**db_product_data)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        
        return {"status": "success", "product": db_product}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[dict])
def get_products(db: Session = Depends(get_db)):
    try:
        # Fetch products from database
        products = db.query(Product).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    try:
        # Delete product from Shopify
        shopify_service.delete_product(product_id)
        
        # Delete product from database
        db.query(Product).filter(Product.shopify_id == product_id).delete()
        db.commit()
        
        return {"status": "success", "message": "Product deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))