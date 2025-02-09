from sqlalchemy import Column, Integer, String, Float, JSON
from ..database.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    shopify_id = Column(String(255), unique=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255))
    price = Column(Float, nullable=False)
    variants = Column(JSON)
    inventory = Column(Integer)
    image_url = Column(String(255))