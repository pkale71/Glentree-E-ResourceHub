SELECT distinct distinct s.id, s.uuid, s.name ,s.location, s.contact1, s.contact2, s.email ,s.syllabus_id AS syllabusId,
s.created_on,s.created_by_id, s.curriculum_upload AS curriculumUpload, s.is_active, sy.name AS syllabusName, 
            CONCAT(u.first_name,' ',IFNULL(u.last_name,'')) AS createdByName, s.is_active,
           (SELECT IF(COUNT(cm.school_id)> 0,1,0) FROM curriculum_master cm
               WHERE cm.school_id = s.id AND cm.academic_year_id = 1 ) AS curriculumExist,
               
			(select IF((select IF(count(cm.subject_id) > 0,1,0) from curriculum_master cm
            WHERE cm.school_id = s.id AND cm.academic_year_id = 1 AND cm.subject_id = sgs.id) > 0, 1,
            IF((SELECT IF(count(usg.school_id) > 0,1,0) FROM user_supervise_grade usg
            WHERE usg.school_id = s.id)>0,1,
            IF((SELECT IF(count(usgs.school_id) > 0,1,0) FROM user_supervise_grade_subject usgs
            WHERE usgs.school_id = s.id)>0,1,
            (SELECT IF(count(utss.school_id) > 0,1,0) FROM user_teach_subject_section utss
            WHERE utss.school_id = s.id))))) AS syllabusExist

            FROM school s 
            LEFT JOIN syllabus sy ON sy.id = s.syllabus_id
            LEFT JOIN syllabus_grade_subject sgs ON sgs.syllabus_id = s.syllabus_id
            LEFT JOIN user u ON u.id = s.created_by_id
             where s.uuid = '04a14e9f-dfb5-11ed-a234-c4346b527e08'
            group by s.id,sy.id
            order by s.id