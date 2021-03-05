import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

import ProgressionWrapper from './ProgressionWrapper';
import SectionTitle from './SectionTitle';
import ActionButton from './ActionButton';

import starBg from './images/star-bg.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    color: '#fff',
    background: 'linear-gradient(181.58deg, #8D1EAA 2.25%, #6D28AA 91.21%)',
    position: 'relative', // For pseudo-element background
    padding: '24px 0 calc(12.5vw + 80px)',
    fontSize: 13,
    lineHeight: 1.9,

    [theme.breakpoints.up('md')]: {
      padding: '48px 0 10vw',
      fontSize: 18,
      lineHeight: 1.667,
    },

    '&::before': {
      content: "''",
      position: 'absolute',
      top: '4vw',
      left: '4vw',
      right: '4vw',
      background: `url(${starBg}) no-repeat`,
      backgroundSize: 'contain',
      height: '96vw',

      zIndex: -1,
    },
  },
  shadow: {
    filter: 'drop-shadow(0px 0px 57px #67227E)',
  },
  empowerTitle: {
    margin: '80px 0 16px',
    [theme.breakpoints.up('md')]: {
      margin: '96px 0 42px',
    },
  },
  empowerContent: {
    margin: '1em auto',
    padding: '0 32px',
    maxWidth: 604,
    textAlign: 'justify',
    letterSpacing: 0.2,
  },
}));

function SectionEcosystem() {
  const classes = useStyles();

  return (
    <div className={classes.shadow}>
      <ProgressionWrapper className={classes.wrapper}>
        <SectionTitle className={classes.title}>事實查核生態系</SectionTitle>

        <Box textAlign="center" maxWidth={1024} px={4} mx="auto">
          <h3>Cofacts 真的假的</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`是原創的查核訊息聊天機器人，唯一開放原始碼、同時建立了目前最大的中文不實訊息查核平台，
            透過群眾協作的方式鼓勵志工參與，並且給予不同類別的志工獎勵起發動機。
            固定舉辦實體活動進行事實查核技巧訓練與社群活動，持續維護開發並且創造新功能，
            並且開源與其他開發者分享。`}
          </p>
        </Box>

        <Box textAlign="center">
          <Link href="/" passHref>
            <ActionButton style={{ color: '#ffb500' }} theme="dark">
              前往 Cofacts 真的假的網站
            </ActionButton>
          </Link>
        </Box>

        <SectionTitle className={classes.empowerTitle}>
          事實查核培力
        </SectionTitle>
        <p className={classes.empowerContent}>
          即便是擁有思辨能力、查證能力的個體，遇到 LINE
          上來自不同聊天視窗、的不實訊息，也會覺得重複查找資料回應很吃力、甚至放棄掙扎。
        </p>

        <p className={classes.empowerContent}>
          Cofacts 像是這些人面對假訊息時，共同編纂的一份共筆；Cofacts
          聊天機器人會查詢現有不實訊息的澄清回應、也能讓人提交新的申訴，把需要查證的資訊送進公開資料庫。
        </p>

        <p className={classes.empowerContent}>
          此類資源的共享，讓散佈在各個聊天群組、關心不實訊息影響的公民們，開始有了團結起來抵抗不實訊息的基礎；Cofacts
          也會舉辦查核工作坊，培訓進行新的編輯志工培力，讓大家能齊聚一堂，不用再孤軍奮戰。
        </p>
      </ProgressionWrapper>
    </div>
  );
}

export default SectionEcosystem;
