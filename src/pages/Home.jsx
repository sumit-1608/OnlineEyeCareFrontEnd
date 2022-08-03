import CarouselSlider from "../components/CarouselSlider";

import Container from "../components/Container";

export default function Home() {
  const imageList = [
    "https://thumbs.dreamstime.com/b/blue-eye-looking-exam-chart-eye-care-concept-blue-eye-exam-144398513.jpg",
    "https://www.inspirage.com/wp-content/uploads/2019/11/144-Doctor_iStock-1023224308_PowerPoint.jpg",
    "https://backend-uk.essilor.co.uk/var/essilor/storage/images/3/7/3/5/645373-1-eng-GB/woman-having-an-oct-scan.jpg",

    "https://www.consensusortho.com/wp-content/uploads/2019/10/Blog-Website-Header_Importance-of-Doctor-Patient-Relationship-Blog.png",
    "https://t3.ftcdn.net/jpg/03/23/25/50/360_F_323255053_eEej6HkF9zCpLbU9e65B9qGJpFx1zJJT.jpg",
    "https://media.istockphoto.com/vectors/people-wait-in-hospital-hall-interior-vector-illustration-cartoon-vector-id1256189055?k=20&m=1256189055&s=612x612&w=0&h=XyGI5i42-9dkchl_RFJzIlmJ3snPc-JgVe-yaSMaPZA=",
    "https://media.istockphoto.com/photos/doctor-and-surgeon-professional-team-with-medical-clinic-background-picture-id1034035462?k=20&m=1034035462&s=170667a&w=0&h=Vh7ZAXDGS8oepcr2Wy1k2hALtH2c7Z5KurNrihPxbts=",
  ];

  return (
    <Container>
      <CarouselSlider imageList={imageList} />
      <p className="text-left m-6 font-bold">
        Our Specialities Combining exceptional knowledge and experience with the
        latest in ophthalmic technology, we provide complete eye care across
        multiple specialities. Read more about our deep expertise in areas like
        cataract, refractive error correction with laser, glaucoma management,
        squint and others.
      </p>
      <h4 className="text-center font-bold text-green-500">
        {" "}
        PATIENT CARE EXPERIENCE
      </h4>
      <p className="m-6 font-bold  margin-bottom: 10px">
        Online Eye care has over 14+ years in providing eye treatment to the
        patients. Online Eye care offers world class facilities to the patient
        and provides a conducive environment for quick recovery. Online Eye care
        doctors add the personal touch by offering comprehensive psychological
        counseling to the patients undergoing surgeries. The management and
        staff at EYE-Q hospitals give their best to offer the best services to
        the patients for their quick recovery. Online Eye care's record of
        successfully catering to 50+ lakh patients speaks about its holistic
        approach that Online Eye care follows.
      </p>
    </Container>
  );
}
