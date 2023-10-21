const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const Integration = require("./Integration")
const Message = require("../mensagem/mesage")

router.get("/integrations", userAuth, (req, res) => {
  Message.findAll().then(messages => {
    res.render("integrations/index", { messages: messages, user: req.session.user })
  })
})




router.post("/integrations/create", userAuth, (req, res) => {

  const description = req.body.description;
  const diaDoMes = req.body.dia;
  const horaDoDia = req.body.hora;
  const t_agente = req.body.t_agente;
  const t_siprov = req.body.t_siprov;
  const canal = req.body.canal;
  const url = req.body.url;
  const message = req.body.message;
  const t_asaas = req.body.t_asaas;
  const t_wppApi = req.body.t_wppApi;

  if (t_siprov == "") {
    console.log("Aqui" + t_siprov)
    const integration_siprov = {
      "name": description,
      "nodes": [{
          "parameters": {
            "options": {}
          },
          "id": "723de1fb-58b6-4372-af49-c20836f7ba35",
          "name": "Set",
          "type": "n8n-nodes-base.set",
          "typeVersion": 1,
          "position": [
            2740,
            220
          ]
        },
        {
          "parameters": {
            "url": "https://api.siprov.com.br/siprov-api/ext/associado",
            "sendQuery": true,
            "queryParameters": {
              "parameters": [{
                "name": "cpf",
                "value": "={{ $json[\"cpfCnpjPessoa\"] }}"
              }]
            },
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                "name": "Authorization",
                "value": "=Bearer {{ $json[\"authorizationToken\"] }}"
              }]
            },
            "options": {}
          },
          "id": "537d242b-ee3c-480a-80b2-383de91ef1d5",
          "name": "HTTP Request",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            3320,
            460
          ],
          "retryOnFail": false,
          "continueOnFail": true
        },
        {
          "parameters": {
            "fieldToSplitOut": "itens",
            "options": {}
          },
          "id": "63efd503-937b-43b2-ab56-76ccba18f109",
          "name": "Item Lists",
          "type": "n8n-nodes-base.itemLists",
          "typeVersion": 1,
          "position": [
            2940,
            220
          ]
        },
        {
          "parameters": {
            "method": "POST",
            "url": "https://api.siprov.com.br/siprov-api/ext/autenticacao",
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                "name": "Authorization",
                "value": "Basic " + t_siprov
              }]
            },
            "options": {}
          },
          "id": "d53119db-38db-4e0e-8f9a-295cb970f611",
          "name": "AUTENTICAÇÃO",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            120,
            220
          ]
        },
        {
          "parameters": {
            "url": "https://api.siprov.com.br/siprov-api/ext/financeiro/titulo",
            "sendQuery": true,
            "queryParameters": {
              "parameters": [{
                  "name": "tipo",
                  "value": "Crédito"
                },
                {
                  "name": "dataVencimentoInicial",
                  "value": "={{ $json[\"dataInicial\"] }}"
                },
                {
                  "name": "dataVencimentoFinal",
                  "value": "={{ $json[\"dataFinal\"] }}"
                },
                {
                  "name": "situacao",
                  "value": "aberto"
                }
              ]
            },
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                "name": "Authorization",
                "value": "={{ $json[\"authorizationType\"] }} {{ $json[\"authorizationToken\"] }}"
              }]
            },
            "options": {}
          },
          "id": "8d05d40c-2eab-4f00-9ae3-8eb638211fb9",
          "name": "CLIENTES DO MES",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            2560,
            220
          ]
        },
        {
          "parameters": {
            "mode": "combine",
            "combinationMode": "multiplex",
            "options": {}
          },
          "id": "1ae87daf-e6ab-4332-9728-d603a4149b3c",
          "name": "Merge",
          "type": "n8n-nodes-base.merge",
          "typeVersion": 2,
          "position": [
            3080,
            460
          ]
        },
        {
          "parameters": {
            "mode": "runOnceForEachItem",
            "jsCode": "$input.item.json.telefoneCelular = \"55\" + $input.item.json.telefoneCelular.replace(\"(\",\"\").replace(\")\",\"\").replace(\"-\",\"\");\n\nreturn $input.item;"
          },
          "id": "423e25bb-4ce0-47eb-b4f0-8ecd41ad7904",
          "name": "Code1",
          "type": "n8n-nodes-base.code",
          "typeVersion": 1,
          "position": [
            3480,
            460
          ]
        },
        {
          "parameters": {
            "jsCode": "const currentDate = new Date();\n\n// const day = String(currentDate.getDate()).padStart(2, '0');\nconst month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de zero, por isso é necessário adicionar 1\nconst year = currentDate.getFullYear();\n\nconst dataInicial = `01/${month}/${year}`;\nconst dataFinal = `30/${month}/${year}`;\n\n\nreturn { dataInicial: dataInicial,dataFinal:dataFinal };\n"
          },
          "id": "2d74ced4-a4ff-4c6f-a560-33b6d5f90fd5",
          "name": "GERA DATA INICIAL",
          "type": "n8n-nodes-base.code",
          "typeVersion": 1,
          "position": [
            2080,
            160
          ]
        },
        {
          "parameters": {
            "mode": "combine",
            "combinationMode": "multiplex",
            "options": {}
          },
          "id": "da1e88ca-482e-4a99-9433-a1913853b20b",
          "name": "Merge1",
          "type": "n8n-nodes-base.merge",
          "typeVersion": 2,
          "position": [
            2380,
            220
          ]
        },
        {
          "parameters": {
            "rule": {
              "interval": [{
                "field": "months",
                "triggerAtDayOfMonth": parseInt(diaDoMes),
                "triggerAtHour": parseInt(horaDoDia)
              }]
            }
          },
          "id": "edd7da98-00f6-4c98-b37c-88789b6eae0a",
          "name": "Schedule Trigger",
          "type": "n8n-nodes-base.scheduleTrigger",
          "typeVersion": 1,
          "position": [
            1740,
            520
          ]
        },
        {
          "parameters": {
            "url": "https://" + url + "/api/v4/message/send",
            "sendQuery": true,
            "queryParameters": {
              "parameters": [{
                  "name": "token",
                  "value": t_agente
                },
                {
                  "name": "channel_id",
                  "value": canal
                },
                {
                  "name": "platform_id",
                  "value": "=55{{ $json[\"Telefone Celular\"].replaceAll(\"(\",\"\").replaceAll(\")\",\"\").replaceAll(\"-\",\"\") }}"
                },
                {
                  "name": "type",
                  "value": "text"
                },
                {
                  "name": "message",
                  "value": message
                },
                {
                  "name": "close_session",
                  "value": "1"
                },
                {
                  "name": "contact_name",
                  "value": "={{ $json.Nome }}"
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
          "id": "a70248bd-200f-43f5-8cf3-5110de61023b",
          "name": "HTTP Request1",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            3720,
            280
          ]
        }
      ],
      "connections": {
        "Set": {
          "main": [
            [{
              "node": "Item Lists",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Item Lists": {
          "main": [
            [{
              "node": "Merge",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "AUTENTICAÇÃO": {
          "main": [
            [{
                "node": "Merge",
                "type": "main",
                "index": 1
              },
              {
                "node": "Merge1",
                "type": "main",
                "index": 1
              }
            ]
          ]
        },
        "CLIENTES DO MES": {
          "main": [
            [{
              "node": "Set",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Merge": {
          "main": [
            [{
              "node": "HTTP Request",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "HTTP Request": {
          "main": [
            [{
              "node": "Code1",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "GERA DATA INICIAL": {
          "main": [
            [{
              "node": "Merge1",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Merge1": {
          "main": [
            [{
              "node": "CLIENTES DO MES",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Schedule Trigger": {
          "main": [
            [{
              "node": "AUTENTICAÇÃO",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Code1": {
          "main": [
            [{
              "node": "HTTP Request1",
              "type": "main",
              "index": 0
            }]
          ]
        }
      },
      "settings": {}
    }

    Integration.create({
      name: description,
      json: JSON.stringify(integration_siprov)
    }).then(() => {
      createWorkflow(integration_siprov).then((response) => activeWorkflow(response.id))

    }).catch((err) => {
      res.redirect("/")
    })

  } else {
    console.log("Ou aqui" + t_asaas)

    const integration_asaas = {
      "name": description,
      "nodes": [{
          "parameters": {
            "rule": {
              "interval": [{
                "triggerAtHour": 22,
                "triggerAtMinute": 28
              }]
            }
          },
          "id": "52a31ec7-ea52-45e2-b180-886dcb852c5f",
          "name": "Schedule Trigger",
          "type": "n8n-nodes-base.scheduleTrigger",
          "typeVersion": 1,
          "position": [
            380,
            220
          ]
        },
        {
          "parameters": {
            "url": "=https://www.asaas.com/api/v3/customers/{{ $json[\"customer\"] }}",
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                  "name": "accept",
                  "value": "application/json"
                },
                {
                  "name": "access_token",
                  "value": t_asaas
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
          "id": "4ca09e60-e88a-4dca-861b-456c0af010ee",
          "name": "HTTP Request",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            1320,
            -20
          ]
        },
        {
          "parameters": {
            "url": "https://www.asaas.com/api/v3/payments",
            "sendQuery": true,
            "queryParameters": {
              "parameters": [{
                  "name": "dueDate[ge]",
                  "value": "={{ $json.timestamp.split(\"T\")[0]}}"
                },
                {
                  "name": "dueDate[le]",
                  "value": "={{ $json.timestamp.split(\"T\")[0]}}"
                }
              ]
            },
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                  "name": "accept",
                  "value": "application/json"
                },
                {
                  "name": "access_token",
                  "value": t_asaas
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
          "id": "9a563e55-ad94-4730-9eea-851a62a053c9",
          "name": "HTTP Request1",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            820,
            220
          ]
        },
        {
          "parameters": {
            "fieldToSplitOut": "data",
            "options": {}
          },
          "id": "0b28ece8-ec2b-4b44-a67b-fce89ab73467",
          "name": "Item Lists",
          "type": "n8n-nodes-base.itemLists",
          "typeVersion": 2,
          "position": [
            1020,
            120
          ]
        },
        {
          "parameters": {
            "mode": "combine",
            "combinationMode": "mergeByPosition",
            "options": {}
          },
          "id": "d7b529fd-57cd-4aec-ba43-6e2d01cdea73",
          "name": "Merge",
          "type": "n8n-nodes-base.merge",
          "typeVersion": 2,
          "position": [
            1860,
            220
          ],
          "alwaysOutputData": true
        },
        {
          "parameters": {
            "keepOnlySet": true,
            "values": {
              "string": [{
                  "name": "customer",
                  "value": "={{ $json.customer }}"
                },
                {
                  "name": "value",
                  "value": "={{ $json.value }}"
                },
                {
                  "name": "description",
                  "value": "={{ $json.description }}"
                },
                {
                  "name": "dueDate",
                  "value": "={{ $json.dueDate }}"
                },
                {
                  "name": "invoiceUrl",
                  "value": "={{ $json.invoiceUrl }}"
                }
              ]
            },
            "options": {}
          },
          "id": "d29a844e-1adb-4951-8269-417d7601b50d",
          "name": "Set",
          "type": "n8n-nodes-base.set",
          "typeVersion": 2,
          "position": [
            1340,
            240
          ]
        },
        {
          "parameters": {
            "keepOnlySet": true,
            "values": {
              "string": [{
                  "name": "name",
                  "value": "={{ $json.name }}"
                },
                {
                  "name": "mobilePhone",
                  "value": "=55{{ $json.mobilePhone }}"
                }
              ]
            },
            "options": {}
          },
          "id": "e8252e3d-0dab-4c0c-9173-682da49896ae",
          "name": "Set1",
          "type": "n8n-nodes-base.set",
          "typeVersion": 2,
          "position": [
            1540,
            -20
          ]
        },
        {
          "parameters": {
            "method": "POST",
            "url": "https://api.wppchat.com.br/api/messages/send",
            "sendHeaders": true,
            "headerParameters": {
              "parameters": [{
                "name": "Authorization",
                "value": "Bearer " + t_wppApi
              }]
            },
            "sendBody": true,
            "bodyParameters": {
              "parameters": [{
                  "name": "number",
                  "value": "={{ $json.mobilePhone }}"
                },
                {
                  "name": "body",
                  "value": "=‎Olá, {{$json[\"name\"].split(' ')[0]}} segue o seu boleto com vencimento para o dia {{$json.dueDate}} referente ao {{$json.description}} no valor de R$ {{$json.value}},00\n\n{{$json.invoiceUrl}}"
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
          "id": "bbd6de87-45e5-48b9-90e8-42c3bd86e775",
          "name": "HTTP Request3",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 3,
          "position": [
            2080,
            220
          ]
        },
        {
          "parameters": {
            "value": "={{$now}}",
            "toFormat": "YYYY-MM-DD",
            "options": {}
          },
          "id": "92028d6f-e54b-4f92-8719-ca23755d1c98",
          "name": "Date & Time",
          "type": "n8n-nodes-base.dateTime",
          "typeVersion": 1,
          "position": [
            600,
            220
          ]
        }
      ],
      "connections": {
        "Schedule Trigger": {
          "main": [
            [{
              "node": "Date & Time",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "HTTP Request1": {
          "main": [
            [{
              "node": "Item Lists",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Item Lists": {
          "main": [
            [{
                "node": "HTTP Request",
                "type": "main",
                "index": 0
              },
              {
                "node": "Set",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "HTTP Request": {
          "main": [
            [{
              "node": "Set1",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Set": {
          "main": [
            [{
              "node": "Merge",
              "type": "main",
              "index": 1
            }]
          ]
        },
        "Set1": {
          "main": [
            [{
              "node": "Merge",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Merge": {
          "main": [
            [{
              "node": "HTTP Request3",
              "type": "main",
              "index": 0
            }]
          ]
        },
        "Date & Time": {
          "main": [
            [{
              "node": "HTTP Request1",
              "type": "main",
              "index": 0
            }]
          ]
        }
      },
      "settings": {}
    }

    Integration.create({
      name: description,
      json: JSON.stringify(integration_asaas)
    }).then(() => {
      createWorkflow(integration_asaas).then((response) => activeWorkflow(response.id))

    }).catch((err) => {
      res.redirect("/")
    })

  }

  function createWorkflow(integration) {
    return fetch(`https://wpp-api.micchelloliveira.com/api/v1/workflows`, {
        method: "POST",
        body: JSON.stringify(integration),
        headers: {
          "Content-Type": "application/json",
          "X-N8N-API-KEY": "n8n_api_c1b05547bc88c2b7eb680ce24f8e27c65ba4746a712b33e146abc15ffb44eb101e2da81d9486772f"
        }
      })
      .then(response => response.json())
  }

  // createWorkflow(integration_siprov).then((response)=>activeWorkflow(response.id))

  function activeWorkflow(id) {
    return fetch(`https://wpp-api.micchelloliveira.com/api/v1/workflows/${id}/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-N8N-API-KEY": "n8n_api_c1b05547bc88c2b7eb680ce24f8e27c65ba4746a712b33e146abc15ffb44eb101e2da81d9486772f"
      }
    }).then(() => {
      res.redirect("/integrations");
    }).catch((e) => {
      res.redirect("/");
    })

  }

})



// router.get("/api/integrations",  (req, res) => {
//   Integration.findAll().then(integrations => {
//     res.send({ integrations: integrations })
//   })

// })


module.exports = router;