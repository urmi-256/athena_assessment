'use client';
import { useState, useEffect } from "react";
import styles from './page.module.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  // storing api content
  const [content, setContent] = useState([]);

  // having ref of view for different headings
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();

  // changing visiblity of video
  const variant = {
    visible: {
      display: "block",
    },
    hidden: {
      display: "none"
    }
  }
  // fetch api data
  const fetchData = async () => {
    await fetch('https://mocki.io/v1/ee762599-31ae-4a3d-a6c7-d596525945e1').then((res) => res.json()).then(
      (data) => {
        setContent(data.texts);
      }
    )
  }
  useEffect(() => {
    fetchData();
  }, []);

  // set video visibility
  useEffect(() => {
    if (inView1) {
      control1.start('visible');
      control2.start('hidden');
      control3.start('hidden');
    }
    else if (inView2) {
      control1.start('hidden');
      control2.start('visible');
      control3.start('hidden');
    }
    else if (inView3) {
      control1.start('hidden');
      control2.start('hidden');
      control3.start('visible');
    }
  })

  return (
    <div className={styles.main_container}>
      {/* page heading */}
      <label className={styles.page_heading}>Kula Replica</label>
      <p className={styles.page_para}>Open conversations and nurture relationships at scale and be the first choice when your ideal candidate is ready to explore.</p>

      {/* text api heading container */}
      <div className={styles.heading_container}>
        <div className={styles.innerheading_container}>
          {content.map((headingContent, id) => {
            return (
              <motion.div ref={(id === 0) ? ref1 : (id === 1) ? ref2 : ref3} key={id} className={styles.heading_content}>
                <h1>{headingContent.heading}</h1>
                <h3>{headingContent.subHeading}</h3>
                <p>{headingContent.description}</p>
              </motion.div>
            )
          })
          }
        </div>

        {/* video container */}
        <div className={styles.video_container}>

          {/* video div */}
          <motion.div variants={variant}
            initial="hidden"
            animate={control1} className={styles.inner_video_container}><video loop autoPlay muted src={'https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/6341303c29c5340961dc9ae6_Mco-1-transcode.mp4'} type="video/mp4" height={'500rem'} style={{ borderRadius: '2rem',marginLeft:'3rem'}} /></motion.div>
          <motion.div variants={variant}
            initial="hidden"
            animate={control2}><video loop autoPlay muted src={'https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/63413ff244f1dc616b7148a0_Mco-transcode.mp4'} type="video/mp4" height={'500rem'} style={{ borderRadius: '2rem',marginLeft:'3rem'}} /></motion.div>
          <motion.div variants={variant}
            initial="hidden"
            animate={control3}><video loop autoPlay muted src={'https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/63455a67996ba248148c4e31_add-options%20(3)-transcode.mp4'} type="video/mp4" height={'500rem'} style={{ borderRadius: '2rem',marginLeft:'3rem'}} /></motion.div>
        </div>
      </div>
    </div>
  )
}
