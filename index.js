
const {initializeDatabase} = require('./db/db.connect');
const {Hotel} = require('./models/hotel.models');
const cors = require("cors");

initializeDatabase();

//previous file data be2.1_hw2
// const newHotel = {
//     name: "New Hotel",
//     category: "Mid-Range",
//     location: "123 Main Street, Frazer Town",
//     rating: 4.0,
//     reviews: [],
//     website: "https://hotel-example.com",
//     phoneNumber: "+1234567890",
//     checkInTime: "2:00 PM",
//     checkOutTime: "12:00 PM",
//     amenities: ["Laundry", "Room Service"],
//     priceRange: "$$$ (31-60)",
//     reservationsNeeded: true,
//     isParkingAvailable: true,
//     isWifiAvailable: true,
//     isPoolAvailable: false,
//     isSpaAvailable: false,
//     isRestaurantAvailable: true,
//     photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
//   };

//   async function seedData(data){
//     try{
//     const hotelData = new Hotel(data);
//     const saveData=await hotelData.save();
//     console.log('Hotel Data',saveData);
//     }
//     catch(error){
//         throw error;
//     }
//   }
//   seedData(newHotel);

const hotels=[
  {
    name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
  },
  {
    name: "Sunset Resort",
    category: "Resort",
    location: "12 Main Road, Anytown",
    rating: 4.0,
    reviews: [],
    website: "https://sunset-example.com",
    phoneNumber: "+1299655890",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
    priceRange: "$$$$ (61+)",
    reservationsNeeded: true,
    isParkingAvailable: true,
    isWifiAvailable: true,
    isPoolAvailable: true,
    isSpaAvailable: true,
    isRestaurantAvailable: true,
    photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
  }
];

const seedData=async(data)=>{
  data.forEach(el=>{
    const hotel=new Hotel({
      name:el.name,
      category:el.category,
      location:el.location,
      rating:el.rating,
      reviews:el.reviews,
      website:el.website,
      phoneNumber:el.phoneNumber,
      checkInTime:el.checkInTime,
      checkOutTime:el.checkOutTime,
      amenities:el.amenities,
      priceRange:el.priceRange,
      reservationsNeeded:el.reservationsNeeded,
      isParkingAvailable:el.isParkingAvailable,
      isWifiAvailable:el.isWifiAvailable,
      isPoolAvailable:el.isPoolAvailable,
      isSpaAvailable:el.isSpaAvailable,
      isRestaurantAvailable:el.isRestaurantAvailable,
      photos:el.photos
    })
    hotel.save();
  })
}
//seedData(hotels);

const allHotels=async()=>{
  const hotels=await Hotel.find();
  console.log(hotels);
  return hotels;
}
//allHotels();

const findByName=async(name)=>{
  const hotel=await Hotel.find({name:name});
  console.log(hotel)
  return hotel;
}
//findByName('Lake View');

const isParkingOffer=async()=>{
  const hotel=await Hotel.find({isParkingAvaliable:true});
  console.log(hotel);
}
//isParkingOffer();

const isRestaurantAvailable=async()=>{
  const hotel= await Hotel.find({isRestaurantAvailable:true});
  console.log(hotel);
}
//isRestaurantAvailable();

const hotelByCategory=async(category)=>{
  const hotel=await Hotel.find({category:category});
  console.log(hotel)
  return hotel;
}
//hotelByCategory('Mid-Range');

const filterByCategory=async(price)=>{
  const hotel=await Hotel.find({priceRange:price});
  console.log(hotel);
}
//filterByCategory("$$$$ (61+)");

const filterByRating=async(rating)=>{
  const hotel=await Hotel.find({rating:rating});
  console.log(hotel)
  return hotel;
}
//filterByRating(4);

const findByPhone=async(number)=>{
  const hotel=await Hotel.find({phoneNumber:number});
  console.log(hotel);
  return hotel;
}
//findByPhone('+1299655890');

//BE2.2_HW2

async function updateHotelById(id,data){
  const hotel=await Hotel.findOneAndUpdate({_id:id},data,{new:true});
}
//updateHotelById('67938c8bf3afb1a7cbd09833',{checkOutTime:'11:00 PM'})

async function updateHotelRating(name,data){
    const hotel=await Hotel.findOneAndUpdate({name:name},{rating:data},{new:true});
}
//updateHotelRating("Sunset Resort",4.2);

async function updateHotelByNumber(phoneNumber,data){
  const hotel=await Hotel.findOneAndUpdate({phoneNumber:phoneNumber},{phoneNumber:data});
}
//updateHotelByNumber('+1299655890','+1997687392');

//BE2.4_HW2
async function deleteHotelById(id){
  const hotel=await Hotel.findByIdAndDelete(id);
  console.log('deleted hotel:',hotel);
}

//deleteHotelById('6793671ddb038c8e79c93e1b');

async function deleteHotelByPhoneNumber(number){
  const hotel=await Hotel.findOneAndDelete({phoneNumber:number});
  console.log('Hotel deleted',hotel);
}
//deleteHotelByPhoneNumber('+1299655890');


//BE4.1_HW2
const express=require('express');
const app=express();
app.use(cors());
app.use(express.json())
app.listen(3000,()=>{
  console.log('Express server running on 3000');
})

app.get("/hotels",async(req,resp)=>{
  try{
    const hotels=await allHotels();
    if(hotels.length){
      resp.send(hotels);
    }
    else{
      resp.status(404).json({error:'Hotel not found'})
    }
  }
  catch(error){
    resp.status(500).json({error:"Error while fetching data"})
  }
})

app.get("/hotels/:hotelName",async(req,resp)=>{
  try{
    const hotel=await findByName(req.params.hotelName);
    if(hotel.length){
      resp.send(hotel)
    }
    else{
      resp.status(404).json({error:'Hotel not found.'})
    }
  }
  catch(error){
    resp.status(500).json({error:'Error while fetching data.'})
  }
})

app.get("/hotels/directory/:phoneNumber",async(req,resp)=>{
  try{
    const hotel=await findByPhone(req.params.phoneNumber);
    if(hotel.length){
      resp.send(hotel);
    }
    else{
      resp.status(404).json({error:'Hotel not found'});
    }
  }
  catch(error){
    resp.status(500).json({error:'Error while fetching data'})
  }
})

app.get("/hotels/rating/:hotelRating",async(req,resp)=>{
  try{
    const hotel = await filterByRating(req.params.hotelRating);
    if(hotel.length){
      resp.send(hotel);
    }
    else{
      resp.status(404).json({error:"Hotel not found."})
    }
  }
  catch(error){
    resp.status(500).json({error:'Error while fetching'})
  }
})

app.get("/hotels/category/:hotelCategory",async(req,resp)=>{
  try{
    const hotel=await hotelByCategory(req.params.hotelCategory);
    if(hotel.length){
      resp.send(hotel);
    }
    else{
      resp.status(404).json({error:'Hotel not found.'})
    }
  }
  catch(error){
    resp.status(500).json({error:'Error while fetching data.'})
  }
})

//4.2_HW2

const saveHotel=async(data)=>{
const hotel=await Hotel(data);
  hotel.save();
  return hotel;
}

app.post("/hotels",async(req,resp)=>{
try{
  const hotel = await saveHotel(req.body);
  resp.status(201).json({message:'Hotel saved',hotel});
}
catch(error){
  resp.status(500).json({error:'Failed to save hotel.'})
}
})
//

//BE4.3_HW2
const deleteHotel=async(id)=>{
  const hotel=await Hotel.findByIdAndDelete(id);
  return hotel;
}

app.delete("/hotels/:id",async(req,resp)=>{
  try{
    const hotel=await deleteHotel(req.params.id);
    resp.status(201).json({message:'Hotel deleted succesfully'});
  }
  catch(error){
    resp.status(500).json({error:"Hotel not deleted"})
  }
})

//BE4.4_HW2

const updateHotel=async(id,data)=>{
  const hotel = await Hotel.findByIdAndUpdate(id,data);
  return hotel;
}

app.post("/hotels/:id",async(req,resp)=>{
  try{
    const hotel=await updateHotel(req.params.id,req.body);
    resp.status(201).json({message:'Hotel updated succesfully'})
  }
  catch(error){
    resp.status(500).json({error:"Error while updating hotel."})
  }
})