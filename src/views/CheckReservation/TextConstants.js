export const QueryConstants = {
  getReservation: `
query getReservationID ($reservationId:String!){
  user{
    getReservationById(data:{reservationId:$reservationId}){
      error
      data{
        id
        reservationIdentifier
        peopleQuantities
        reservationTime
        owner{
          phone
          username
          firstName
          firstLastname
          email
        }
      }
      message
    }
  }
}
  `,
};
