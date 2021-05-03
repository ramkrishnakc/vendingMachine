# vending-machine
This is a private repository. A software to operate a vending machine.

# About the project
This is a simple project to meet the need of operating a vending machine. There are list of products available. You can buy any of those available product by making proper payment. You can also return the product (if needed) within 10 days of purchase and get your refund.

# Technology stack:
  - Written on Node JS, Express JS framework is used for server creation, middleware e.t.c
  - Mongo DB is used as application Database, Mongoose is used for doing cruds to DB
  - React, Redux used in client side to handle the Application
  - Webpack used to bundle or build
  (Also refer to the package.json for more information about packages used)

# Getting Started
  # Requirements
  - node version > v10.14.1 (follow this link https://nodejs.org/en/download/)
  - git (follow this link https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - mongodb version > 4.4.0 (follow this link https://docs.mongodb.com/manual/administration/install-community/)
  # Starting the project without docker
  - git clone https://github.com/ramkrishnakc/vendingMachine.git (Clone the project)
  - Mongo DB should be up and running before starting the project
  - npm install (Install the dependencies)
    # Start dev server
      - npm run start (Running development server)
      - Go to browser and 'http://localhost:8009' | 'https://localhost:8449'
    # Start prod server
      - npm run build
      - npm run production (Running production server)
      - Go to browser and 'http://localhost:8000' | 'https://localhost:8443'

    # Running test
    - npm install (only if haven't run it already - i.e. install the dependencies)
    - npm run test

# Important point**
  - Inside /server/certs there are https certificates (which is not a good thing to do). Copy those or new certs to proper location and set process.env.CERTIFICATE_LOCATION. 

# How to start working on this project
  - Create a git branch
  - Work and make changes in your branch
  - Then, send pull request to 'master' branch from your working branch