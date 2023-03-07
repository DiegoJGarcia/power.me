import React, { FC, useEffect, useState } from 'react';
import './Stats.scss';

import Card from 'components/core/Card';

type TStatsProps = {
	data?: any;
};

export const Stats: FC<TStatsProps> = () => {
	return <Card className="stats">Stats</Card>;
};
