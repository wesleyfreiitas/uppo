const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const Integration = require("./Integration")


router.get("/integrations", userAuth, (req, res) => {
    Integration.findAll().then(integrations => {
      res.render("integrations/index", { integrations: integrations})
    })

})


router.post("/integrations/create", userAuth, (req, res) => {

  const name = req.body.integracao;
  const execution = "12";
  const descricao = "WhatsApp";

  const json = JSON.stringify({
    "name": "ABSOLUTA - UPCHANNEL - 554835122080",
    "nodes": [
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"contacts\": [\n                {\n                    \"vcard\": \"{{$json[\"message\"][\"displayName\"]}} - {{$json[\"message\"][\"phones\"][0]}}\"\n                }\n            ],\n    \"type\": \"contact\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "d0847089-a2dd-4e0f-b725-6834ab104ede",
        "name": "CONTACT",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          1380
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"location\": {\n                \"latitude\": {{ $json[\"message\"][\"latitude\"] }},\n                \"longitude\": {{ $json[\"message\"][\"longitude\"] }} \n            },\n    \"type\": \"location\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "e6bc056f-3da6-4c02-ab0a-ffc8702ddd53",
        "name": "LOCATION",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          1160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"audio\": {\n            \"url\": \"{{ $json[\"message\"][\"audioUrl\"] }}\",\n            \"mime_type\": \"audio/mpeg\"\n        },\n    \"type\": \"audio\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "19b08989-50e0-4045-ae5a-a5701462c144",
        "name": "AUDIO",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          940
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"document\": {\n            \"url\": \"{{ $json[\"message\"][\"documentUrl\"] }}\",\n            \"mime_type\": \"application/pdf\",\n            \"filename\":\"{{ $json[\"message\"][\"fileName\"] }}\"\n        },\n    \"type\": \"document\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "ea4e2dea-bc9f-4c17-8227-8d78e564fe49",
        "name": "DOCUMENT",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          720
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"video\": {\n            \"url\": \"{{ $json[\"message\"][\"videoUrl\"] }}\",\n            \"mime_type\": \"{{ $json[\"message\"][\"mimeType\"] }}\",\n            \"caption\": \"{{ $json[\"message\"][\"caption\"] }}\"\n        },\n    \"type\": \"video\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "1915ba32-a49f-422b-904b-8ed8e9c769bf",
        "name": "VIDEO",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          500
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"image\": {\n            \"url\": \"{{ $json[\"message\"][\"imageUrl\"] }}\",\n            \"mime_type\": \"image/jpeg\",\n            \"caption\": \"{{ $json[\"message\"][\"caption\"] }}\"\n        },\n    \"type\": \"image\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}  ",
          "options": {}
        },
        "id": "738cbf46-18f6-4746-9d6c-0114242937a7",
        "name": "IMAGE",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          320
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\",\n\"group\":\"{{ $json[\"chatName\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"type\": \"text\",\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"message\": \"{{ $json[\"message\"][\"message\"].replace(/(\\r\\n|\\r|\\n|\\t)/g, '\\\\n').replace(/(\")/g,\"'\") }}\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}",
          "options": {}
        },
        "id": "49547e65-27f6-414e-a511-37343299c6ba",
        "name": "TEXT",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1500,
          60
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"image\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "94b2ee45-9409-428b-a7b9-0c87de92b6be",
        "name": "FORMAT IMAGE",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          260
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"text\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              },
              {
                "name": "chatName",
                "value": "={{ $json[\"body\"][\"chatName\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "de773832-e3d7-44fa-ba56-8433e60d3043",
        "name": "FORMAT TEXT",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          60
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"video\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "4b779d2b-07a0-4553-8499-ee538097bbdd",
        "name": "FORMAT VIDEO",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          500
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"document\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "4a45754c-0d80-4ba1-ba76-8bcfaf7682e3",
        "name": "FORMAT DOCUMENT",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          720
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"location\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "b579e2dc-3f50-4b3c-b3ae-d5785fa9c4ff",
        "name": "FORMAT LOCATION",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          1160
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"contact\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "c114eda8-f26a-43ea-afe8-50f879baeaf4",
        "name": "FORMAT CONTACT",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          1380
        ]
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"audio\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "4b1341a2-0641-40c6-b23a-258b7bae399f",
        "name": "FORMAT AUDIO",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1280,
          940
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=text"
              }
            ]
          }
        },
        "id": "2acad2d0-d316-4f12-b18e-1da39cc3b63c",
        "name": "IF TEXT",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          980,
          60
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=image"
              }
            ]
          }
        },
        "id": "7812d512-8ca6-4ee3-a663-e4c0619498f7",
        "name": "IF IMAGE",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1000,
          280
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=video"
              }
            ]
          }
        },
        "id": "0b680ab2-ae02-49e1-a4e6-72820f3d355d",
        "name": "IF VIDEO",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          980,
          520
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=document"
              }
            ]
          }
        },
        "id": "dbe3f867-06f3-402d-a603-1905fe327421",
        "name": "IF DOCUMENT",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1000,
          740
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=audio"
              }
            ]
          }
        },
        "id": "f68cec3a-d515-40df-9550-251471c830e3",
        "name": "IF AUDIO",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1000,
          960
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=location"
              }
            ]
          }
        },
        "id": "5ef2f0e6-5b5f-4553-ab49-2218fdda951d",
        "name": "IF LOCATION",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1000,
          1180
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=contact"
              }
            ]
          }
        },
        "id": "cff60c2f-0bc1-424a-a53a-97fb66296891",
        "name": "IF CONTACT",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1000,
          1400
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ $json.body.origin }}",
                "value2": "generic"
              }
            ]
          }
        },
        "id": "25d63ca3-d93c-4b07-8645-94044026d199",
        "name": "SE ENTRADA OU SAIDA",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          640,
          60
        ]
      },
      {
        "parameters": {
          "values": {
            "string": [
              {
                "name": "instance",
                "value": "3BEE85DEB7B0909AA6090E35A8A7689D"
              },
              {
                "name": "token",
                "value": "B6FDEA90DAC41C5406494CD1"
              },
              {
                "name": "api-key",
                "value": "CIpH3xIZjcfLOsiepqVMI"
              },
              {
                "name": "host",
                "value": "uppteste.uppchannel.com.br"
              }
            ]
          },
          "options": {}
        },
        "id": "70eef3b3-9e85-4160-afe7-b20b241d15a2",
        "name": "VARIAVEIS DE AMBIENTES",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          440,
          60
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://api.z-api.io/instances/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][0][\"value\"] }}/token/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][1][\"value\"] }}/send-audio",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "phone",
                "value": "={{ $json.body.phone }}"
              },
              {
                "name": "audio",
                "value": "={{ $json.body.audio }}"
              }
            ]
          },
          "options": {
            "redirect": {
              "redirect": {
                "followRedirects": true
              }
            }
          }
        },
        "id": "b996382e-ae5d-4f46-8d6f-d1b5e8a5fe39",
        "name": "Z-AUDIO",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1260,
          -280
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://api.z-api.io/instances/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][0][\"value\"] }}/token/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][1][\"value\"] }}/send-image",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "phone",
                "value": "={{ $json.body.phone }}"
              },
              {
                "name": "image",
                "value": "={{ $json.body.image }}"
              },
              {
                "name": "caption",
                "value": "={{ $json.body.caption }}"
              }
            ]
          },
          "options": {
            "redirect": {
              "redirect": {
                "followRedirects": true
              }
            }
          }
        },
        "id": "afa94cf7-1cda-49d7-929b-79e13c230958",
        "name": "Z-IMAGE",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1420,
          -160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://api.z-api.io/instances/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][0][\"value\"] }}/token/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][1][\"value\"] }}/send-video",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "phone",
                "value": "={{ $json.body.phone }}"
              },
              {
                "name": "video",
                "value": "={{ $json.body.video }}"
              },
              {
                "name": "caption",
                "value": "={{ $json.body.caption }}"
              }
            ]
          },
          "options": {
            "redirect": {
              "redirect": {
                "followRedirects": true
              }
            }
          }
        },
        "id": "7aca91a3-07bf-4123-b5b3-fe16ddb17d4e",
        "name": "Z-VIDEO",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1620,
          -160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://api.z-api.io/instances/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][0][\"value\"] }}/token/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][1][\"value\"] }}/send-document/pdf",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "document",
                "value": "={{ $json[\"body\"][\"document\"] }}"
              },
              {
                "name": "fileName",
                "value": "={{ $json[\"body\"][\"fileName\"] }}"
              }
            ]
          },
          "options": {
            "redirect": {
              "redirect": {
                "followRedirects": true
              }
            }
          }
        },
        "id": "011610a1-e484-497d-a15f-51a6715be6f8",
        "name": "Z-DOCUMENT",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1820,
          -160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://api.z-api.io/instances/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][0][\"value\"] }}/token/{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][1][\"value\"] }}/send-messages",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "phone",
                "value": "={{ $json.body.phone }}"
              },
              {
                "name": "message",
                "value": "={{ $json.body.message }}"
              }
            ]
          },
          "options": {
            "redirect": {
              "redirect": {
                "followRedirects": true
              }
            }
          }
        },
        "id": "f5044572-236e-4f2a-99a0-1050dc6e1f5f",
        "name": "Z-TEXT",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          980,
          -500
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ $json.body.type }}",
                "value2": "=text"
              }
            ]
          }
        },
        "id": "fe43ee0b-15b5-4b8c-98cf-9db7a66c8156",
        "name": "VERIFICA SE A PRIMEIRA SAIDA É TEXTO",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          800,
          -200
        ]
      },
      {
        "parameters": {
          "dataType": "string",
          "value1": "={{ $json.body.type }}",
          "rules": {
            "rules": [
              {
                "value2": "audio"
              },
              {
                "value2": "image",
                "output": 1
              },
              {
                "value2": "video",
                "output": 2
              },
              {
                "value2": "document",
                "output": 3
              }
            ]
          }
        },
        "id": "0999c2f8-f639-4b98-b1cb-a0249baa8346",
        "name": "SEPARADOR DE REQUISIÇÕES",
        "type": "n8n-nodes-base.switch",
        "typeVersion": 1,
        "position": [
          1020,
          -160
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "d304a584-6e78-4538-9d54-16f9a2088e43",
          "options": {}
        },
        "id": "d6d5c302-2a12-4fb9-893c-994430f38b4d",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          180,
          60
        ],
        "webhookId": "d304a584-6e78-4538-9d54-16f9a2088e43"
      },
      {
        "parameters": {
          "url": "={{ $json[\"message\"][\"imageUrl\"] }}",
          "options": {}
        },
        "id": "b021f342-116e-487e-9afe-562c6dcad166",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1820,
          160
        ]
      },
      {
        "parameters": {
          "binaryData": true,
          "name": "{{ $json[\"message\"][\"mimeType\"] }}",
          "options": {}
        },
        "id": "de7e8621-6fdc-4317-8e67-c20e9214bc2a",
        "name": "Google Drive",
        "type": "n8n-nodes-base.googleDrive",
        "typeVersion": 2,
        "position": [
          2040,
          160
        ],
        "credentials": {
          "googleDriveOAuth2Api": {
            "id": "1",
            "name": "Google Drive account"
          }
        }
      },
      {
        "parameters": {
          "keepOnlySet": "false",
          "values": {
            "string": [
              {
                "name": "phone",
                "value": "={{ $json[\"body\"][\"phone\"] }}"
              },
              {
                "name": "name",
                "value": "={{ $json[\"body\"][\"senderName\"] }}"
              },
              {
                "name": "message",
                "value": "={{ $json[\"body\"][\"listResponseMessage\"][\"title\"] }}"
              },
              {
                "name": "id",
                "value": "={{ $json[\"body\"][\"messageId\"] }}"
              },
              {
                "name": "timestamp",
                "value": "={{ $json[\"body\"][\"momment\"] }}"
              }
            ]
          },
          "options": {}
        },
        "id": "77acd0e0-2e8a-4311-81ea-aec26d6ef9ac",
        "name": "FORMAT CONTACT1",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          1360,
          1680
        ]
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{ Object.keys($json[\"body\"]).join(', ') }}",
                "operation": "contains",
                "value2": "=contact"
              }
            ]
          }
        },
        "id": "cf34b20f-bbe2-4015-962b-483bdaa61b77",
        "name": "IF LIST",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          1160,
          1580
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=https://{{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][3][\"value\"] }}/api/v4/generic/messages/send",
          "sendHeaders": true,
          "headerParameters": {
            "parameters": [
              {
                "name": "API-KEY",
                "value": "={{ $node[\"VARIAVEIS DE AMBIENTES\"].parameter[\"values\"][\"string\"][2][\"value\"] }}"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          },
          "sendBody": true,
          "contentType": "raw",
          "rawContentType": "application/json",
          "body": "={\n  \"contact\": {\n    \"name\": \"{{ $json[\"name\"] }}\"\n  },\n  \"number\": \"{{ $json[\"phone\"] }}\",\n  \"message\": {\n    \"type\": \"text\",\n    \"id\": \"{{ $json[\"id\"] }}\",\n    \"message\": \"{{ $json[\"message\"].replace(/(\\r\\n|\\r|\\n|\\t)/g, '\\\\n').replace(/(\")/g,\"'\") }}\",\n    \"timestamp\": \"{{ $json[\"timestamp\"] }}\"\n  }\n}",
          "options": {}
        },
        "id": "6412f090-5b13-4a04-bf00-96747e52c7c0",
        "name": "TEXT2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1600,
          1680
        ]
      }
    ],
    "pinData": {},
    "connections": {
      "FORMAT IMAGE": {
        "main": [
          [
            {
              "node": "IMAGE",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT TEXT": {
        "main": [
          [
            {
              "node": "TEXT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT VIDEO": {
        "main": [
          [
            {
              "node": "VIDEO",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT DOCUMENT": {
        "main": [
          [
            {
              "node": "DOCUMENT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT LOCATION": {
        "main": [
          [
            {
              "node": "LOCATION",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT CONTACT": {
        "main": [
          [
            {
              "node": "CONTACT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT AUDIO": {
        "main": [
          [
            {
              "node": "AUDIO",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF TEXT": {
        "main": [
          [
            {
              "node": "FORMAT TEXT",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF IMAGE",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF IMAGE": {
        "main": [
          [
            {
              "node": "FORMAT IMAGE",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF VIDEO",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF VIDEO": {
        "main": [
          [
            {
              "node": "FORMAT VIDEO",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF DOCUMENT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF DOCUMENT": {
        "main": [
          [
            {
              "node": "FORMAT DOCUMENT",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF AUDIO",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF AUDIO": {
        "main": [
          [
            {
              "node": "FORMAT AUDIO",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF LOCATION",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF LOCATION": {
        "main": [
          [
            {
              "node": "FORMAT LOCATION",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF CONTACT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF CONTACT": {
        "main": [
          [
            {
              "node": "FORMAT CONTACT",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF LIST",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SE ENTRADA OU SAIDA": {
        "main": [
          [
            {
              "node": "VERIFICA SE A PRIMEIRA SAIDA É TEXTO",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "IF TEXT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "VARIAVEIS DE AMBIENTES": {
        "main": [
          [
            {
              "node": "SE ENTRADA OU SAIDA",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "VERIFICA SE A PRIMEIRA SAIDA É TEXTO": {
        "main": [
          [
            {
              "node": "Z-TEXT",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "SEPARADOR DE REQUISIÇÕES",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SEPARADOR DE REQUISIÇÕES": {
        "main": [
          [
            {
              "node": "Z-AUDIO",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "Z-IMAGE",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "Z-VIDEO",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "Z-DOCUMENT",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook": {
        "main": [
          [
            {
              "node": "VARIAVEIS DE AMBIENTES",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request": {
        "main": [
          [
            {
              "node": "Google Drive",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF LIST": {
        "main": [
          [],
          [
            {
              "node": "FORMAT CONTACT1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FORMAT CONTACT1": {
        "main": [
          [
            {
              "node": "TEXT2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "active": true,
    "settings": {},
    "versionId": "21bfcc2b-a67a-4bc0-aaef-dc8a9de56c26",
    "id": "18",
    "meta": {
      "instanceId": "3ffaf9925256d38a717c641e05f9d6a8a5af0657cad9ca639bcabc91baa71625"
    },
    "tags": [
      {
        "createdAt": "2023-06-16T13:09:34.831Z",
        "updatedAt": "2023-06-16T13:09:34.831Z",
        "id": "2",
        "name": "ABSOLUTA"
      }
    ]
  });

  Integration.create({
    name: name,
    execution: execution,
    descricao: descricao,
    json: json
  }).then(() => {
    res.redirect("/integrations");
  // res.render("integrations/index")

  }).catch((err) => {
    res.redirect("/")
  })


})



module.exports = router;