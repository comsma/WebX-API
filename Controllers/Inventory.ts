import {Controller} from "controllers.ts/decorator/Controllers";
import {Get, Post, Put, Patch, Delete} from "controllers.ts/decorator/Methods";
import {NextFunction, Request, request, Response} from "express";
import {Req, Res} from "controllers.ts/decorator/Params";
import {SQLInventory} from "../db/sql-inventory"
import { Stock } from "../Interfaces/Inventory";


@Controller()

export class inventoryController extends SQLInventory {
    @Post("/api/prices")
    prices(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        let username = req.body.cxml.credentials[0].userid
        let password = req.body.cxml.credentials[0].password
        let customerid = req.body.cxml.credentials[0].customerid
        let parts = req.body.cxml.credentials[0].partslist[0]
        console.log(username, password, customerid)
        for (let i = 0; i < parts.part.length; i++) {
            console.log(parts.part[i])
        }
        res.sendStatus(200);
    }

    @Post("/api/stock")
    stock(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        let reply: Stock[] = []
        let parts = req.body.cxml.credentials[0].partslist[0]
        for (let i = 0; i < parts.part.length; i++) {
            this.getStock(JSON.stringify(parts.part[i].partnumber[0]).replace(/['"]+/g, '')).then(stock => {
                reply.push(stock)
                console.log(reply)
            })

        }
        res.send(reply)
        res.sendStatus(200)
    }
}