define({
  api: [
    {
      type: "delete",
      url: "/api/users/:id",
      title: "deleteUser",
      name: "delete_User",
      group: "Admin",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "id",
              description: "<p>User's unique Id.</p>",
            },
          ],
        },
      },
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content: 'HTTP/1.1 200 OK\n{\nmessage:"Deletion Successful"\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "User deletion unsuccessful",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "Admin",
    },
    {
      type: "get",
      url: "/api/users",
      title: "get Users",
      name: "getUsers",
      group: "Admin",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "user Details fetched successfully",\n  "userData":user Details\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Sorry there was an error Users not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "Admin",
    },
    {
      type: "get",
      url: "/api/users/:id",
      title: "getUser",
      name: "get_User",
      group: "Admin",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "id",
              description: "<p>User's unique Id.</p>",
            },
          ],
        },
      },
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\nmessage:"fetched user details successfully"\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "User not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "Admin",
    },
    {
      type: "put",
      url: "/api/users/:id",
      title: "updateUser",
      name: "update_User",
      group: "Admin",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "id",
              description: "<p>User's unique Id.</p>",
            },
          ],
        },
      },
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\nuserData:updated User details,\nmessage:"updated user successfully"\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Update failed!!",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "Admin",
    },
    {
      type: "post",
      url: "/api/article/:articleId/comment",
      title: "Comment Article",
      name: "CommentArticle",
      group: "Article",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "comment added successfully",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "comment added failure",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/article.js",
      groupTitle: "Article",
    },
    {
      type: "post",
      url: "/api/users/createarticle",
      title: "Create Article",
      name: "CreateArticle",
      group: "Article",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "text",
              description: "<p>Content of article.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "description",
              description: "<p>description of article.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "title",
              description: "<p>Title of article.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "imgSrc",
              description: "<p>Cover image of article.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "article added successfully",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "article not saved",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/article.js",
      groupTitle: "Article",
    },
    {
      type: "get",
      url: "/api/article/:articleId",
      title: "Get Article",
      name: "GetArticle",
      group: "Article",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "text",
              description: "<p>Comment.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": " fetched article successfully",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "article not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/article.js",
      groupTitle: "Article",
    },
    {
      type: "post",
      url: "/api/article/:articleId/like",
      title: "Like Article",
      name: "LikeArticle",
      group: "Article",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content: 'HTTP/1.1 200 OK\n{\n  "message": "liked",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content: 'HTTP/1.1 404 Not Found\n{\n  "error": "remove liked",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/article.js",
      groupTitle: "Article",
    },
    {
      type: "post",
      url: "/api/packages/createpackage",
      title: "Create Package",
      name: "CreatePackage",
      group: "Package",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pName",
              description: "<p>Name of Package.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pType",
              description: "<p>Type of Package.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pTag",
              description: "<p>Tag of Package.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pDescription",
              description: "<p>Description of Package.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pPrice",
              description: "<p>Price of Package.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pImage",
              description: "<p>Cover image of Package.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "Package added successfully",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Package not saved",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/packageController.js",
      groupTitle: "Package",
    },
    {
      type: "post",
      url: "/api/packages/:packageId",
      title: "Get Package",
      name: "GetPackage",
      group: "Package",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "Package fetched successfully",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Package not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/packageController.js",
      groupTitle: "Package",
    },
    {
      type: "post",
      url: "/api/users/register",
      title: "Register User",
      name: "RegisterUser",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "name",
              description: "<p>Name of the User.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>Email of the User.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "password",
              description: "<p>Password of the User.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "A verification email has been sent to ....",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Technical Issue!, Please click on resend for verify your Email.",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
    {
      type: "post",
      url: "/api/resendLink",
      title: "Resend Confirmation Mail",
      name: "Resend_Confirmation_Mail",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>Email of the User.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "A verification email has been sent to ....",\n}',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "Technical Issue!, Please click on resend for verify your Email.",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
    {
      type: "put",
      url: "/api/users/register",
      title: "Update User",
      name: "UpdateUser",
      group: "User",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "name",
              description: "<p>Name of the User.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>Email of the User.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "Updated Successfully",\n   "userData":Updated User details,\n}',
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "UserNotFound",
              description: "<p>The User was not found.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "User not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
    {
      type: "get",
      url: "/user/:email/:token",
      title: "confirm Email",
      name: "confirm_Email",
      group: "User",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>User's email.</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "token",
              description: "<p>User's token.</p>",
            },
          ],
        },
      },
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "Verified Successfully,Please login",\n}',
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "TokenNotFound",
              description: "<p>The token of the User was not found.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Error-Response:",
            content: 'HTTP/1.1 404 Not Found\n{\n  "error": "Invalid token"\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
    {
      type: "get",
      url: "/api/users/profile",
      title: "get User Profile",
      name: "getUser",
      group: "User",
      header: {
        fields: {
          authentication: [
            {
              group: "authentication",
              type: "String",
              optional: false,
              field: "x-auth-token",
              description: "<p>JWT.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "name",
              description: "<p>Name of the User.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>Email of the User.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              '    HTTP/1.1 200 OK\n    {\n      "message": "user Details fetched successfully",\n"userData":user Details\n    }',
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "UserNotFound",
              description: "<p>The User was not found.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Error-Response:",
            content:
              'HTTP/1.1 404 Not Found\n{\n  "error": "User not found",\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
    {
      type: "post",
      url: "/api/users/login",
      title: "login User",
      name: "loginUser",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>Email of the User.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "password",
              description: "<p>Password of the User.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "message": "Login Successful",\n  "userData": userDetails\n}',
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "./controllers/userController.js",
      groupTitle: "User",
    },
  ],
});
