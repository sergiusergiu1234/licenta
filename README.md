# Licence univeristy Project
E-commerce web Spring Boot backend + React frontend + MySQL database application. 

This project represents a web shopping application. At the time of development, it was meant to be used for marketing of skiing and snowboarding equipment, but it can be used for any business that folds on the database schema.

Backend was created in java 11 using Spring Boot framework with different dependencies such as Spring Data JPA, Spring Web, Spring Security, etc (check pom.xml file).
Fronted was created using Typescript React with Bootstrap, React Router, etc.
Database is a MySql database.

Application features:
    -dynamic product filtering based on multiple criteria
    -authentification and authorisation
    -shopping cart
    -placing orders based on shopping cart content
    -wishlist
    -CRUD operations on products and information related to products
    -order status management
    -product images external storage using AmazonS3

Possible further improvements:
    -upgrading database schema to: 
        -better describe the products
        -include multiple delivery addresses and cards for every user
        -include reviews for products
        -store multiple images for each product
    -user interface imporvement
    -deployment of the application
    -making the application mobile responsive





