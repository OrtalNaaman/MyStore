import { Component } from '@angular/core';

@Component({
  template: ` <section class="content-section container">
    <h2 class="section-header">UCG- Unique Clothes for Girls</h2>
    <img
      class="about-band-image"
      src="assets/Images/AboutPhoto.jpg"
      alt="Purple Girl"
    />
    <h3>Welcome to UCG- Unique Clothes for Girls and baby girls store!</h3>
    <p>
      At UCG Store, we specialize in providing unique and fashionable clothing
      options for girls and baby girls. We understand that every little girl
      deserves to feel special and express her individuality through her style.
      That's why we offer a carefully curated collection of clothes that are
      designed to be stylish, comfortable, and perfect for any occasion.
    </p>
    <br />
    <p>
      Our Philosophy: <br />
      We believe that clothing is more than just fabric and stitches. It is a
      reflection of personality, creativity, and confidence. Our philosophy
      revolves around empowering girls and baby girls to embrace their
      uniqueness and showcase their personal style through our clothing range.
      We strive to create a positive and inclusive environment where every girl
      can feel beautiful, confident, and comfortable in her own skin.
    </p>
    <p>
      Quality and Durability: <br />
      At UCG, we prioritize quality and durability. We understand that children
      can be active, playful, and sometimes messy, so our clothing is made to
      withstand their adventures. We carefully select fabrics that are soft,
      breathable, and safe for delicate skin. Our garments are expertly crafted
      to ensure durability, ensuring that they can be treasured and passed down
      to younger siblings or friends.
    </p>
    <p>
      Fashion-forward Designs:<br />
      Our team of talented designers stays up-to-date with the latest fashion
      trends, ensuring that our clothing collection is always fresh, stylish,
      and on-trend. Whether it's adorable dresses, cute tops, comfortable
      leggings, or charming accessories, we have a wide range of options to suit
      every girl's unique taste and preferences. From vibrant prints to elegant
      patterns, our designs are carefully crafted to make every girl feel like a
      fashionista.
    </p>
    <p>
      Size and Fit: <br />
      We understand that finding the perfect fit for growing girls can be a
      challenge. That's why we offer a variety of sizes, ensuring that you can
      find the ideal fit for your little one. We provide detailed size charts
      and measurements to help you make the right selection. If you need any
      assistance or have questions regarding sizing, our friendly customer
      support team is always here to help.
    </p>
    <p>
      Customer Satisfaction: <br />
      We are committed to providing an exceptional shopping experience for our
      customers. Your satisfaction is our top priority. We strive to offer
      excellent customer service, prompt shipping, and hassle-free returns. If
      you have any questions, concerns, or feedback, please don't hesitate to
      reach out to us. We value your input and are dedicated to continuously
      improving our products and services.
    </p>
    <p>
      Join Our Community: <br />
      We invite you to become a part of our vibrant and supportive community.
      Follow us on social media to stay updated with the latest trends, fashion
      inspiration, and special offers. We also encourage you to share your
      little one's adorable photos wearing our clothing using our dedicated
      hashtags. We love seeing our customers' smiling faces! Thank you for
      choosing UCG for your girls and baby girls' clothing needs. We are honored
      to be a part of your journey in creating unforgettable memories and
      stylish moments. Shop with us today and let your little one's uniqueness
      shine through our fabulous collection!
    </p>
  </section>`,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@100;300&family=Caveat&family=Source+Sans+Pro:wght@600&display=swap');
      .container,
      h2,
      h3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-family: 'Caveat', cursive;
        font-weight: normal;
      }
      p {
        margin-right: 18vw;
        margin-left: 18vw;
      }
      .section-header {
        text-align: center;
      }
      img {
        margin: 1.66%;
        width: 20rem;
        height: 20rem;
      }
    `,
  ],
})
export class AboutPageComponent {}
