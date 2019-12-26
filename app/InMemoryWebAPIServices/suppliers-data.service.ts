import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Supplier } from '../Models/supplier';
import { Admin } from '../Models/admin';
import { SupplierAddress } from '../Models/supplier-address';
import { SystemUser } from '../Models/system-user';
import { RawMaterial } from '../Models/raw-material';
import { Product } from '../Models/product';
import { Order } from '../Models/order';
import { Distributor } from '../Models/distributor';
import { ProductOrder } from '../Models/product-order';
import { DistributorAddress } from '../Models/distributor-address';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService implements InMemoryDbService
{
  constructor() { }

  createDb()
  {
    let admins = [
      new Admin(1, '101', 'Admin', 'admin@capgemini.com', 'manager')
    ];

    let systemusers = [
      new SystemUser(1, "7B2D82A7-B6B9-4B96-B852-F7954D34528E", 'notAnAdmin', 'notanadmin@foo.com', 'notamanager',"10/3/2019", "10/4/2019")
    ]

    let rawmaterials = [
      new RawMaterial(1, "5D3034E3-ED22-4C24-9D2B-EEE4B187058E", "APP", "Apple", 20, "3/7/2012", "8/9/2019"),
      new RawMaterial(2, "ED3DCF6D-1A93-4F94-B91C-18546B04DB34", "SUG", "Sugar", 180, "8/1/2002", "8/9/2003"),
      new RawMaterial(3, "59D6BD5D-9B05-435F-80DF-74647301B835", "MAN", "Mango", 17, "12/10/2009", "8/9/2017"),
      new RawMaterial(4, "E58BCC33-A90D-43B5-B365-D51CEA3B2A82", "BAN", "Banana", 12, "21/9/2010", "8/9/2018")
    ];

    let products = [
      new Product(1, "F15BEB17-5E0F-47EB-9A23-146A8EE7F617", "APPJ", "AppleJuice", "Juice", 20, "3/7/2012", "8/9/2019"),
      new Product(2, "DCBD2AD7-8461-4270-827D-E14F5B8DCD08", "FRJ", "FruitJuice", "Juice", 10, "8/1/2002", "8/9/2003"),
      new Product(3, "BA12E05E-BF09-496F-9429-2ED35A96CAEE", "MGJ", "MangoJuice", "Juice", 17, "12/10/2009", "8/9/2017"),
      new Product(4, "678DA738-BDE9-4294-AB1F-F0B241E1ACF3", "BNJ", "BananaJuice", "Juice", 12, "21/9/2010", "8/9/2018")
    ];
   
    let suppliers = [
      new Supplier(1, "401476EE-0A3B-482E-BD5B-B94A32355959", "Scott", "9876543210", "scott@capgemini.com", "Scott123#", "10/3/2019", "10/4/2019"),
      new Supplier(2, "C628855C-FE7A-4D94-A1BB-167157D3F4EA", "Smith", "9988776655", "smith@capgemini.com", "Smith123#", "9/6/2019", "5/7/2019"),
      new Supplier(3, "6D68849C-8FA8-4049-A111-B431C76C6548", "Arun", "7781994834", "arun@capgemini.com", "Arun123#", "1/5/2017", "15/11/2018"),
      new Supplier(4, "53E8748F-61D6-494B-BF72-E18B27511EFA", "Jones", "6989493491", "jones@capgemini.com", "Jones123#", "2/7/2019", "12/1/2019")
    ];

    let supplierAddresses = [
      new SupplierAddress(1, "0D3151CB-3393-4111-89AC-11B20D00317B",  "B-1", "Near Lake", "789996", "Guwahati", "Aasam", "10/3/2019", "10/4/2019"),
      new SupplierAddress(2, "21F5B99F-8891-48C0-B535-804ED286D845",  "C-2", "Near Church", "789997", "Gaya", "Bihar", "9/6/2019", "5/7/2019"),
      new SupplierAddress(3, "8D18460F-DCDC-407C-8046-EC50F77626C2",  "D-3", "Near Garden", "789998", "Panaji", "Goa", "1/5/2017", "15/11/2018"),
      new SupplierAddress(4, "A74466C5-2D55-413E-8F8C-7B3F846F8067",  "E-4", "Near Stadium", "789999", "Kochi", "Kerala", "2/7/2019", "12/1/2019")
    ];
    let productorders = [
      new ProductOrder(1, "ED3DCF6D-1A93-4F94-B91C-18546B04DB34", "3/7/2012", "67yuu", 80, 890, "8/9/2003", "8/9/2003")];

    let distributors = [
      new Distributor(1, "401476EE-0A3B-482E-BD5B-B94A32355959", "Scott", "9876543210", "scott@capgemini.com", "Scott1", "10/3/2019", "10/4/2019"),
      new Distributor(2, "C628855C-FE7A-4D94-A1BB-167157D3F4EA", "Smith", "9988776655", "smith@capgemini.com", "Smith123#", "9/6/2019", "5/7/2019"),
      new Distributor(3, "6D68849C-8FA8-4049-A111-B431C76C6548", "Arun", "7781994834", "arun@capgemini.com", "Arun123#", "1/5/2017", "15/11/2018"),
      new Distributor(4, "53E8748F-61D6-494B-BF72-E18B27511EFA", "Jones", "6989493491", "jones@capgemini.com", "Jones123#", "2/7/2019", "12/1/2019")
    ];

    let rawmaterialorder = [
      new Order(1, "401476EE-0A3B-482E-BD5B-B94A32355959", "20/11/2012", "401476EE-0A3B-482E-BD5B-B94A32355959", 100, 100, "9/6/2019", "5/7/2019"),
      new Order(2, "401476EE-0A3B-482E-BD5B-B94A32355959", "20/11/2012", "401476EE-0A3B-482E-BD5B-B94A32355959", 100, 100, "9/6/2019", "5/7/2019"),
      new Order(3, "401476EE-0A3B-482E-BD5B-B94A32355959", "20/11/2012", "401476EE-0A3B-482E-BD5B-B94A32355959", 100, 100, "9/6/2019", "5/7/2019"),
      new Order(4, "401476EE-0A3B-482E-BD5B-B94A32355959", "20/11/2012", "401476EE-0A3B-482E-BD5B-B94A32355959", 100, 100, "9/6/2019", "5/7/2019"),
    ]
      let distributorAddresses = [
      new DistributorAddress(1, "401476EE-0A3B-482E-BD5B-B94A32355959", "Hemu nagar", "flat 202", "Mumbai", "Maharastra", 495005, "10/3/2019", "10/4/2019"),
      new DistributorAddress(2, "C628855C-FE7A-4D94-A1BB-167157D3F4EA", "Saraswati nagar", "house 28", "Raipur", "Chhattisgarh", 495004, "9/6/2019", "5/7/2019"),
      new DistributorAddress(3, "6D68849C-8FA8-4049-A111-B431C76C6548", "North East Colony", "flat 55", "Nagpur", "Maharastra", 495003, "1/5/2017", "15/11/2018"),
      new DistributorAddress(4, "53E8748F-61D6-494B-BF72-E18B27511EFA", "Vrindavan colony", "flat A202", "Jodhpur", "Rajasthan", 495002, "2/7/2019", "12/1/2019")
    ];

    return { admins, suppliers, rawmaterials, products, supplierAddresses, systemusers, distributors, productorders, rawmaterialorder, distributorAddresses };
  }
}


