import React, { useState } from "react";
import { Badge, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FcFinePrint } from "react-icons/fc";

const dummyLogs = [
    {
        title: "클라우드란 무엇인가?",
        tags: ["클라우드 컴퓨팅", "온프레미스", "IaaS", "PaaS", "SaaS"],
        to: "whatIsCloud",
    },
    {
        title: "EC2 인스턴스 생성",
        tags: ["EC2", "키 페어"],
        to: "createEC2",
    },
    {
        title: "SSH 접속",
        tags: ["SSH 접속"],
        to: "sshConection",
    },
    {
        title: "AWS RDS 인스턴스 생성",
        tags: ["RDS", "MySQL", "DB 생성"],
        to: "createRDS",
    },
    {
        title: "RDS 인스턴스 연결",
        tags: ["RDS", "MySQL", "EC2 연동"],
        to: "rdsConection",
    },
    {
        title: "도커란 무엇인가",
        tags: ["Docker", "이미지", "컨테이너", "볼륨", "명령어"],
        to: "whatIsDocker",
    },
    {
        title: "쿠버네티스란 무엇인가",
        tags: ["Kubernetes", "컨테이너", "오케스트레이션", "클러스터", "DevOps"],
        to: "whatIsKubernetes",
    },
];

const Tag = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const allTags = Array.from(new Set(dummyLogs.flatMap((log) => log.tags)));

    const handleTagClick = (tag) => {
        const matchedLog = dummyLogs.find((log) => log.tags.includes(tag));
        if (matchedLog?.to) {
            navigate(`/${matchedLog.to}`);
        }
    };

    const handleTitleClick = (to) => {
        if (to) navigate(`/${to}`);
    };

    const filteredLogs = dummyLogs.filter((log) => {
        const matchTitle = log.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTags = log.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchTitle || matchTags;
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-sky-500">
                <FcFinePrint className="inline-block mr-2 align-middle" />
                태그 및 키워드로 학습 기록 검색
            </h1>

            <div className="mb-4">
                <TextInput
                    icon={HiSearch}
                    type="text"
                    placeholder="제목 또는 태그로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sizing="md"
                />
            </div>



            <ul className="space-y-4">
                {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, i) => (
                        <li
                            key={i}
                            className="border-b border-gray-300 dark:border-gray-700 pb-2"
                        >
                            <p
                                onClick={() => handleTitleClick(log.to)}
                                className="font-semibold text-lg cursor-pointer text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-sky-400 transition"
                            >
                                {log.title}
                            </p>
                            <div className="mt-1 flex gap-2 flex-wrap">
                                {log.tags.map((t, j) => (
                                    <Badge
                                        key={j}
                                        color="indigo"
                                        size="xs"
                                        className="cursor-pointer text-indigo-600"

                                    >
                                        #{t}
                                    </Badge>
                                ))}
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center">
                        일치하는 기록이 없습니다.
                    </p>
                )}
            </ul>
        </div>
    );
};

export default Tag;
